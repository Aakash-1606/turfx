
import { Link } from "react-router-dom";

interface SportCategory {
  name: string;
  image: string;
  count: number;
}

const categories: SportCategory[] = [
  {
    name: "Football",
    image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
    count: 12
  },
  {
    name: "Cricket",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1467&q=80",
    count: 8
  },
  {
    name: "Badminton",
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    count: 15
  },
  {
    name: "Tennis",
    image: "https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?ixlib=rb-4.0.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    count: 6
  }
];

export function SportsCategories() {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Browse by Sport</h2>
          <p className="mt-2 text-muted-foreground">
            Find the perfect turf for your favorite sport
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link 
              key={category.name} 
              to={`/browse?sport=${category.name.toLowerCase()}`}
              className="group relative overflow-hidden rounded-lg hover-scale"
            >
              <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="h-full w-full object-cover transition-transform group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 w-full p-4 text-white">
                  <h3 className="font-semibold">{category.name}</h3>
                  <p className="text-sm opacity-80">{category.count} turfs</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
