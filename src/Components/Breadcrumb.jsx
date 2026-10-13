// import React from "react";
// import { Link } from "react-router-dom";

// const Breadcrumb = ({ paths = [] }) => {
//   if (!paths.length) return null;

//   return (
//     <nav
//       aria-label="breadcrumb"
//       className="bg-slate-100 mb-3 text-gray-700 py-3 shadow-sm"
//     >
//       <div className="max-w-screen-3xl pl-5 md:pl-20 mx-auto px-4">
//         <ol className="flex flex-wrap items-center text-sm">
//           {paths.map((path, index) => (
//             <li key={index} className="flex items-center">
//               {index !== 0 && <span className="mx-2 text-gray-400">›</span>}

//               {index === paths.length - 1 ? (
//                 <span className="text-gray-800 font-medium">{path.name}</span>
//               ) : (
//                 <Link
//                   to={path.link}
//                   className="linkColorGray text-pink-600 hover:underline hover:text-blue-800 transition-colors"
//                 >
//                   {path.name}
//                 </Link>
//               )}
//             </li>
//           ))}
//         </ol>
//       </div>
//     </nav>
//   );
// };

// export default Breadcrumb;


import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ paths = [] }) => {
  if (!paths.length) return null;

  return (
    <nav
      aria-label="breadcrumb"
      className="bg-slate-100 mb-3 text-gray-700 py-3 my-2 shadow-sm"
    >
      <div className="max-w-screen-3xl pl-5 md:pl-20 mx-auto px-4">
        <ol className="flex flex-wrap items-center text-sm">
          {paths.map((path, index) => (
            <li key={index} className="flex items-center">
              {index === paths.length - 1 ? (
                <span className="text-gray-800 font-medium">{path.name}</span>
              ) : (
                <>
                  <Link
                    to={path.link}
                    className="linkColorGray text-pink-600 hover:underline hover:text-blue-800 transition-colors"
                  >
                    {path.name}
                  </Link>
                  <span className="mx-2 text-gray-400">›</span>
                </>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
