import Image from 'next/image';
import React from 'react';

const defaultAvatars = [
 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe',
 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d',
 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126',
];

function Star({ filled = true, className = 'h-6 w-6' }) {
 return (
   <svg viewBox="0 0 24 24" className={`${className} text-amber-400`} aria-hidden="true">
     {filled ? (
       <path fill="currentColor" d="M12 2.5l2.97 6.02 6.65.97-4.81 4.69 1.14 6.64L12 17.77 6.05 20.82l1.14-6.64-4.81-4.69 6.65-.97L12 2.5z" />
     ) : (
       <path stroke="currentColor" strokeWidth="1.8" fill="none" d="M12 3.7l2.52 5.1 5.63.82-4.07 3.97.96 5.6L12 16.9l-5.04 2.65.96-5.6L3.85 9.6l5.63-.82L12 3.7z" />
     )}
   </svg>
 );
}

export default function ProfileRating({
 avatars = defaultAvatars,
 rating = 5,
 title = 'Ratings',
 subtitle = 'Trusted By Client around the World',
}) {
 const full = Math.floor(Math.min(5, Math.max(0, rating)));
 const stars = Array.from({ length: 5 }, (_, i) => i < full);

 return (
   <div className={`flex items-center gap-4 text-white mt-3`}>
     <div className="flex -space-x-4">
       {avatars.slice(0, 4).map((src, i) => (
         <Image
           key={i}
           src={src}    
           alt={`Client ${i + 1}`}
           width={30}
           height={30}
           className="h-10 w-10 rounded-full object-cover"
         />
       ))}
     </div>

     <div className="flex flex-col">
       <div className="flex items-center gap-3">
         <p className="text-sm font-medium">
           {title} {rating.toFixed(1)}
         </p>
         <div className="flex">
           {stars.map((f, i) => (
             <Star key={i} filled={f} />
           ))}
         </div>
       </div>
       <p className="text-xs text-white font-normal">{subtitle}</p>
     </div>
   </div>
 );
}