// order page - redirects to /cart
"use client";

import { redirect } from "next/navigation";

function OrderPage() {
  redirect("/cart");
}

export default OrderPage;
