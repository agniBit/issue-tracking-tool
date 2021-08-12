import React, { useRef, useState, useEffect } from 'react';

const OutsideClick = () => {
    const ref = useRef(null);
    const [open, setOpen] = useState(false);

    const handleClickOutside = (event) => {
        console.log(ref);
        if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    }, [ref]);
    console.log('created fun outside');
    return { open, setOpen, ref }
}

export default OutsideClick;