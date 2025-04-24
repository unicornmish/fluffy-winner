export class EventEntity {
  id: string;
  title: string;
  description?: string;
  date: Date;
  ownerId: string;
  invitedId?: string;
}
