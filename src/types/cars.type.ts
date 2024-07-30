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

export interface CarDetailProps{
  id: string;
  name: string;
  model: string;
  price: string | number;
  year: string | number;
  city: string;
  km: string;
  description: string;
  createdAt: string;
  owner: string;
  uid: string;
  whatsapp: string;
  images: CarImageProps[];
}