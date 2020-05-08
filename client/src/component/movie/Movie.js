import React from "react";
import {MovieSubscriber} from "../subscribers/MovieSubscriber";
import {MovieEditor} from "./MovieEditor";
import {CriteriaList} from "../criteria/CriteriaList";

export const Movie = () => (
    <MovieSubscriber>
        <MovieEditor/>
        <CriteriaList/>
    </MovieSubscriber>
);