import React from 'react';

import { SidebarMenu } from './../../components';

export const SidebarMiddleNav = () => (
    <SidebarMenu>
        <SidebarMenu.Item
            icon={<i className="fa fa-fw fa-home"></i>}
            title="Dashboards"
        >
            <SidebarMenu.Item title="Analytics" to='/dashboards/analytics' exact />
        </SidebarMenu.Item>
        <SidebarMenu.Item
            icon={<i className="fa fa-fw fa-balance-scale"></i>}
            title="Representantes"
        >
            <SidebarMenu.Item title="Todos los representantes" to='/candidates/grid' exact />
            <SidebarMenu.Item title="Tu Representante" to='/my-candidate/profile-detail' exact />
        </SidebarMenu.Item>
        { /* -------- Cards ---------*/ }
        <SidebarMenu.Item
            icon={<i className="fa fa-fw fa-clone"></i>}
            title="Votación"
        >
            <SidebarMenu.Item title="Registro de votación" to='/voting-record' exact />
            <SidebarMenu.Item title="Vota" to='/vote/:id' exact />
            <SidebarMenu.Item title="Propuestas" to='/bills' exact />
        </SidebarMenu.Item>
        { /* -------- Layouts ---------*/ }
        <SidebarMenu.Item
            icon={<i className="fa fa-fw fa-star-o"></i>}
            title="Elecciones"
        > 
            <SidebarMenu.Item title="Elecciones" to='/elections' exact />
        </SidebarMenu.Item>
        { /* -------- Graphs ---------*/ }
        <SidebarMenu.Item
            icon={<i className="fa fa-fw fa-heart-o"></i>}
            title="Take Action"
        >
            <SidebarMenu.Item title="Donate" to='/donate' />
            <SidebarMenu.Item title="Tus Contribuciones" to='/your-donations' />
        </SidebarMenu.Item>
        { /* -------- Forms ---------*/ }
        <SidebarMenu.Item
            icon={<i className="fa fa-fw fa-gears"></i>}
            title="Settings"
        >
            <SidebarMenu.Item title="Gov Position" to='#' />
            <SidebarMenu.Item title="Partido" to='#' />
            <SidebarMenu.Item title="System" to='#' />
        </SidebarMenu.Item>

        <SidebarMenu.Item
            icon={<i className="fa fa-fw fa-bookmark-o"></i>}
            title="Docs"
            href='https://webkom.gitbook.io/spin/v/airframe/airframe-react/documentation-react'
        />
    </SidebarMenu >
);
