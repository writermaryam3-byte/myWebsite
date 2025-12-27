import { db } from "@/lib/prisma";
import { cache } from "../cache";

export const getNewsletterUsers = cache(
    () => {
      const newsletterUsers = db.newsletter.findMany();
      return newsletterUsers;
    },
    ["newsletterUsers"],
    { revalidate: 3600 }
  );