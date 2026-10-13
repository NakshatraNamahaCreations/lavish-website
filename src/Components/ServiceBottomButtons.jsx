import React from 'react';
import whatsapp from "../assets/whatsapp.png"

function ServiceBottomButtons({serviceName, price, city}) {

  // Get the current page URL
  const currentPageUrl = window.location.href;

  // Create the message
  const message = `${currentPageUrl}\nService: ${serviceName}\nCity: ${city},\nPrice: ${price}\nCan I get more details?`;
  const encodedMessage = encodeURIComponent(message);
  const WhatsAppLink = `https://wa.me/919620558000?text=${encodedMessage}`;

  const handleScroll = () => {
    window.scrollTo({
      top: 700,
      behavior: 'smooth', 
    });
  };

  return (
    <div className="md:hidden fixed bottom-0 left-2 flex z-50">
      <button
        className="w-44 flex gap-2 justify-center items-center border bg-green-500 text-white rounded-full px-6 py-2 hover:bg-green-500 hover:text-white"
        onClick={() => window.open(WhatsAppLink, "_blank")}
      >
        <img src={whatsapp} className="w-6" alt="WhatsApp" />
        WhatsApp
      </button>
      <div className='md:hidden fixed bottom-0 right-2 flex z-50 ' >
        <button  onClick={handleScroll}  className='w-44 text-center  border bg-primary text-white rounded-full px-6 py-2 hover:bg-blue-500 hover:text-white'> Book Now</button>
      </div>
    </div>
  );
}

export default ServiceBottomButtons;
