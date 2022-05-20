import React, {Fragment} from "react";
import { Link } from "react-router-dom";

export function Home() {
    return(
        <Fragment>
            <h1>EASY COUNT TOOL</h1>
            <Link to='/recipesList' className='btn btn-success'>
                Recieps list
            </Link>
            {/* <Link to='/recipesList' className='btn btn-success'>
                New recipe
            </Link> */}
            {/* <Link to='/recipesList' className='btn btn-success'>
                Total ingredients
            </Link> */}
        </Fragment>
    );
}


//TODO: Add components missing