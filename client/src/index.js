import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {rootReducer} from "./reducer";
import {Provider} from "react-redux";
import {MainContainer} from "./container/MainContainer";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import {SnackbarProvider} from "notistack";

const store = createStore(rootReducer, applyMiddleware(thunk));
const darkTheme = createMuiTheme({
    palette: {
        type: "dark"
    }
});

ReactDOM.render(
    <Provider store={store}>
        <SnackbarProvider>
            <MuiThemeProvider theme={darkTheme}>
                <CssBaseline/>
                <MainContainer/>
            </MuiThemeProvider>
        </SnackbarProvider>
    </Provider>,
    document.getElementById('root')
);

