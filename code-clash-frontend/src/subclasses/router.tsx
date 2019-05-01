// React
import * as React from 'react';
import { BrowserRouter, Route } from "react-router-dom";

// Models
import Blocks from "./blocks/blocks";
import RegistrationForm from "./accounts/register/register";
import SignInForm from "./accounts/signIn/signIn";
import Account from "./accounts/account";
import Upload from "./accounts/upload/upload";
import BlockView from "./accounts/blockView/blockView";

const Router = () => (
    <div>
        <Route exact path="/" component={Home} />

        <Route path="/blocks" component={Blocks} />

        <Route path="/register" component={RegistrationForm} />
        <Route path="/signin" component={SignInForm} />
        <Route path="/account" component={Account} />
        <Route path="/upload" component={Upload} />

        <Route path="/code/:id" component={BlockView}/>
    </div>
);

const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
);

export default Router;