export interface Device {
  id: string;
  title: string;
  description: string;
  image: string;
  organization: string;
  location: string;
  rating: number;
  specs: {
    screenSize: string;
    ram: string;
    storage: string;
    processor: string;
  };
  condition: "A" | "B" | "C";
  quantity: number;
  price: string;
}

export interface CartItem extends Device {
  quantity: number;
}

export interface Request {
  id: string;
  devices: CartItem[];
  status: "Requested" | "Approved" | "Shipped" | "Received";
  requestDate: string;
  approvalDate?: string;
  shippingDate?: string;
  receivedDate?: string;
  waybillNumber?: string;
  feedback?: {
    rating: number;
    comment: string;
    submittedDate: string;
  };
}

export interface Impact {
  co2Avoided: number;
  moneySaved: number;
  pupilsImpacted: number;
  certificateUrl?: string;
}

export interface Filter {
  screenSize: string[];
  ram: string[];
  storage: string[];
  condition: ("A" | "B" | "C")[];
  quantity: number;
}
