import React from "react";
import cls from './MyModal.module.css'


const MyModal = ({ children, visible, setVisible }) => {

    const rootClasses = [cls.myModal]

    if (visible) {
        rootClasses.push(cls.active)
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cls.myModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default MyModal;