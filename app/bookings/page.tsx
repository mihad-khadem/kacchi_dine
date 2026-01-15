// bookings/page.tsx

import UserLayout from "@/components/layout/UserLayout";
import BookingsLayout from "@/components/booking/BookingLayout";
import React from "react";

const BookingsPage: React.FC = () => {
  return (
    <UserLayout>
      <BookingsLayout />
    </UserLayout>
  );
};
export default BookingsPage;
