import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Users, CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar as CalendarComponent } from './ui/calendar';
import { format } from "date-fns"

interface SearchFiltersProps {
  onFiltersChange: (filters: any) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onFiltersChange }) => {
  const [destination, setDestination] = useState('Rio de Janeiro');
  const [guests, setGuests] = useState('2');
  const [checkIn, setCheckIn] = React.useState<Date>();
  const [checkOut, setCheckOut] = React.useState<Date>();

  const handleSearch = () => {
    onFiltersChange({
      destination,
      checkIn: checkIn ? format(checkIn, "yyyy-MM-dd") : checkIn,
      checkOut: checkOut ? format(checkOut, "yyyy-MM-dd") : checkOut,
      guests,
    });
  };

  return (
    <div className="space-y-6">
      {/* Main Search Bar */}
      <Card className="p-6 shadow-lg bg-gradient-to-br from-card to-accent/5">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 items-end">
          <div className="space-y-2">
            <Label htmlFor="destination" className="text-sm font-medium">Destino</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Para onde você vai?"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Check-in</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  data-empty={!checkIn}
                  className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkIn ? format(checkIn, "PPP") : <span>Selecione a data</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent mode="single" selected={checkIn} onSelect={setCheckIn} />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Check-out</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  data-empty={!checkOut}
                  className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkOut ? format(checkOut, "PPP") : <span>Selecione a data</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent mode="single" selected={checkOut} onSelect={setCheckOut} />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="guests" className="text-sm font-medium">Hóspedes</Label>
            <Select value={guests} onValueChange={setGuests}>
              <SelectTrigger>
                <Users className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 hóspede</SelectItem>
                <SelectItem value="2">2 hóspedes</SelectItem>
                <SelectItem value="3">3 hóspedes</SelectItem>
                <SelectItem value="4">4 hóspedes</SelectItem>
                <SelectItem value="5+">5+ hóspedes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleSearch} className="bg-primary hover:bg-primary-hover h-10">
            <Search className="h-4 w-4 mr-2" />
            Buscar
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SearchFilters;