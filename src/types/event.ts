export interface Event {
  id: string;
  title: string;
  description: string;
  eventType: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  location: string;
  address: string;
  privacy: "public" | "private" | "unlisted";
  imageUrl: string | File;
  attendees: number;
  maxAttendance: number;
  recurring?: boolean;
  recurringType?: string;
}

export interface FormData {
  title: string;
  description: string;
  eventType: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  recurring: boolean;
  recurringType: string;
  location: string;
  address: string;
  privacy: string;
  image: File | null;
  maxAttendance: string;
}
