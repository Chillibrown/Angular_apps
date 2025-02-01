import { Hall } from "./hall";
import { User } from "./user";

export class Booking {
    public bookingId!: number;
    public date!: Date;
    public status!: string;
    public customer!: User;
    public hall!: Hall;
}
