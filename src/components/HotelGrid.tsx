import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Wifi, Car, Utensils, Waves, Heart, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import hotelRio from '@/assets/hotel-rio.jpg';

interface Hotel {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  amenities: string[];
  description: string;
}

interface HotelGridProps {
  hotels: Hotel[];
  isLoading: boolean;
}

const HotelGrid: React.FC<HotelGridProps> = ({ hotels, isLoading }) => {
  const { toast } = useToast();

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wi-fi':
        return <Wifi className="h-3 w-3" />;
      case 'piscina':
        return <Waves className="h-3 w-3" />;
      case 'estacionamento':
        return <Car className="h-3 w-3" />;
      case 'restaurante':
        return <Utensils className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const handleReservation = (hotel: Hotel) => {
    toast({
      title: "Redirecionando para reserva",
      description: `Preparando reserva para ${hotel.name}...`,
    });
  };

  const handleFavorite = (hotel: Hotel) => {
    toast({
      title: "Adicionado aos favoritos",
      description: `${hotel.name} foi salvo nos seus favoritos.`,
    });
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="overflow-hidden animate-pulse">
            <div className="aspect-video bg-muted" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-1/2" />
              <div className="h-8 bg-muted rounded" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (hotels.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Eye className="h-8 w-8 text-primary" />
        </div>
        <h3 className="font-semibold text-foreground mb-2">Nenhum hotel encontrado</h3>
        <p className="text-sm text-muted-foreground">
          Tente ajustar seus filtros ou converse com nossa IA para encontrar opções personalizadas.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {hotels.map((hotel) => (
        <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-accent/5 group">
          <div className="aspect-video relative overflow-hidden">
            <img 
              src={hotelRio} 
              alt={hotel.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-2 right-2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleFavorite(hotel)}
            >
              <Heart className="h-4 w-4" />
            </Button>
            <div className="absolute bottom-2 left-2">
              <Badge className="bg-primary text-primary-foreground">
                Mais Procurado
              </Badge>
            </div>
          </div>
          
          <div className="p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1 line-clamp-1">{hotel.name}</h4>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span className="line-clamp-1">{hotel.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-hotel-rating text-hotel-rating" />
                <span className="font-medium text-foreground">{hotel.rating}</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {hotel.description}
            </p>

            <div className="flex flex-wrap gap-1">
              {hotel.amenities.slice(0, 3).map((amenity) => (
                <Badge key={amenity} variant="secondary" className="text-xs">
                  {getAmenityIcon(amenity)}
                  <span className="ml-1">{amenity}</span>
                </Badge>
              ))}
              {hotel.amenities.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{hotel.amenities.length - 3}
                </Badge>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t">
              <div className="text-right">
                <span className="text-2xl font-bold text-hotel-price">R$ {hotel.price}</span>
                <p className="text-xs text-muted-foreground">por noite</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Detalhes
                </Button>
                <Button 
                  size="sm"
                  className="bg-primary hover:bg-primary-hover"
                  onClick={() => handleReservation(hotel)}
                >
                  Reservar
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default HotelGrid;