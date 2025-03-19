"use client"

import { useCookieStore } from "@/store/store";
import { AnimatePresence, motion } from "framer-motion";

const CookieBanner = () => {

  const { acceptedCookies, setAcceptedCookies } = useCookieStore()

  const cookieValue = useCookieStore.getState().acceptedCookies
  // console.log(acceptedCookies);
  //console.log(cookieValue);
  const handleAcceptCookies = () => setAcceptedCookies(!cookieValue)

  // useEffect(() => {
  //   console.log(acceptedCookies);
  // }, [acceptedCookies])


  if (typeof window === 'undefined') return null
  if (acceptedCookies) return null


  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: acceptedCookies ? 0 : 1 }}
        exit={{ opacity: 0.5 }}
        transition={{ duration: 1.5 }}
        className="sticky z-20 bottom-0 left-0 mt-6 bg-black px-8 py-4"
      >
        <p className="text-sm text-white mb-4">
          We use cookies to enhance your browsing experience, preferences,
          and improve our services. No sensitive information is ever collected.
          Do you accept our use of cookies?
        </p>
        <div className="flex gap-2 mt-2 sm:mt-0">
          <button
            onClick={handleAcceptCookies}
            className="bg-celtics hover:bg-celtics/80 text-white px-4 py-2 rounded"
          >
            Accept
          </button>
          <button
            onClick={handleAcceptCookies}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Reject
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CookieBanner

/* 
fixed bottom-4 left-4 right-4 bg-gray-900 text-white p-4 rounded-lg shadow-lg flex flex-col sm:flex-row items-center justify-between
*/