import React from "react"
import Header from "./header"


const Layout = ({ children, handleOpen }) => {
    return (
        <>
            <Header handleOpen={handleOpen}/>
            <main className="min-h-screen">
                {children}
            </main>
            {/* <Footer /> */}
        </>
    );
};

export default Layout;