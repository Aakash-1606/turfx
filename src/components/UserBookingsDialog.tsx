
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Table, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

interface Booking {
  id: string;
  turf: { name: string } | null;
  booking_date: string;
  start_time: string;
  end_time: string;
  total_price: number;
  status: string;
  payment_status: string;
}

type Props = {
  userId: string | null;
  open: boolean;
  onClose: () => void;
  userName: string;
};

export function UserBookingsDialog({ userId, open, onClose, userName }: Props) {
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && userId) {
      setLoading(true);
      supabase
        .from("bookings")
        .select("id, turf:turfs(name), booking_date, start_time, end_time, total_price, status, payment_status")
        .eq("user_id", userId)
        .order("booking_date", { ascending: false })
        .then(({ data, error }) => {
          setLoading(false);
          if (error) setBookings([]);
          else setBookings(data || []);
        });
    } else {
      setBookings(null);
    }
  }, [open, userId]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle>
            Booking History for {userName}
          </DialogTitle>
          <DialogDescription>
            View all bookings for this user (success, failed, etc)
          </DialogDescription>
        </DialogHeader>
        {loading && <div>Loading bookings...</div>}
        {!loading && (bookings?.length === 0) && <div>No bookings found.</div>}
        {!loading && bookings && bookings.length > 0 && (
          <div className="overflow-x-auto">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Turf</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Payment</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map(b => (
                  <TableRow key={b.id}>
                    <TableCell>{b.turf?.name || "--"}</TableCell>
                    <TableCell>{b.booking_date}</TableCell>
                    <TableCell>{b.start_time} - {b.end_time}</TableCell>
                    <TableCell>₹{b.total_price}</TableCell>
                    <TableCell>
                      <Badge variant={b.status === 'confirmed' ? "default" : b.status === 'cancelled' ? "destructive" : "outline"}>
                        {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={b.payment_status === "paid" ? "default" : b.payment_status === "failed" ? "destructive" : "outline"}>
                        {b.payment_status.charAt(0).toUpperCase() + b.payment_status.slice(1)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
