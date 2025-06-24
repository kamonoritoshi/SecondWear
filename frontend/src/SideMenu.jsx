// src/SideMenu.jsx
import React from 'react';

const SideMenu = ({ t, isSideMenuOpen, handleCloseSideMenu }) => {
    return (
        <>
            <nav className={`side-menu ${isSideMenuOpen ? 'active' : ''}`}>
                <button className="close-side-menu-button" onClick={handleCloseSideMenu}>X</button>
                <h3>{t('menu_title')}</h3>
                <ul>
                    <li><a href="#" onClick={handleCloseSideMenu}>{t('menu_home')}</a></li>
                    <li><a href="#" onClick={handleCloseSideMenu}>{t('menu_products')}</a></li>
                    <li><a href="#" onClick={handleCloseSideMenu}>{t('menu_categories')}</a></li>
                    <li><a href="#" onClick={handleCloseSideMenu}>{t('menu_my_orders')}</a></li>
                    <li><a href="#" onClick={handleCloseSideMenu}>{t('menu_sell_product')}</a></li>
                    <li><a href="#" onClick={handleCloseSideMenu}>{t('menu_contact')}</a></li>
                </ul>
                <div className="side-menu-footer">
                    <p>&copy; SecondWear 2025</p>
                </div>
            </nav>
            {isSideMenuOpen && <div className="side-menu-overlay active" onClick={handleCloseSideMenu}></div>}
        </>
    );
};

export default SideMenu;