import React from 'react'

const PageTitle = ({title, description, breadcrumps}) => {
  return (
    <div className='flex flex-col items-center'>
        <h1 className="text-[40px] text-center font-semibold text-white">{title}</h1>
        {description && <p className="text-white text-center text-md mt-4 leading-7 font-light">{description}</p>}
        {breadcrumps && (
            
            <div className="flex items-center mt-4">
                {breadcrumps.map((item, index) => (
                    <div key={index} className="flex items-center">
                        <a href={item.link} className="text-white hover:text-gray-300 flex items-center" style={!item.link ? {textDecoration: 'underline'} : {}}>
                        {item.icon && <span className="text-sm text-white mr-2">{item.icon}</span>}
                            {item.name}
                        </a>
                        {index < breadcrumps.length - 1 && <span className="text-sm text-white mx-2">/</span>}
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default PageTitle