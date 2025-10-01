import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image?: string;
  slug: string;
  stock: number;
  featured?: boolean;
  onAddToCart?: () => void;
}

const ProductCard = ({
  id,
  name,
  price,
  image,
  slug,
  stock,
  featured,
  onAddToCart,
}: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg animate-fade-in">
      <Link to={`/product/${slug}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          {image ? (
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-muted-foreground">No image</span>
            </div>
          )}
          {featured && (
            <Badge className="absolute left-3 top-3 bg-accent">Featured</Badge>
          )}
          {stock === 0 && (
            <Badge className="absolute right-3 top-3 bg-destructive">Out of Stock</Badge>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <Link to={`/product/${slug}`}>
          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {name}
          </h3>
        </Link>
        <p className="text-2xl font-bold text-primary">${price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={onAddToCart}
          disabled={stock === 0}
          className="w-full"
          size="sm"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
