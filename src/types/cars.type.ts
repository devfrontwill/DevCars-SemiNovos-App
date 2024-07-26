export interface CarsProps {
  id: string;
  name: string;
  year: string;
  km: string;
  city: string;
  price: string | number;
  uid: string;
  images: CarImageProps[];
}

export interface CarImageProps{
  name: string;
  uid: string;
  url: string;
}