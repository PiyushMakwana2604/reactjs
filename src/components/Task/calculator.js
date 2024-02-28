import React, { useEffect, useState } from 'react';
import Header from '../commen/header';
import LeftSideMenu from '../commen/left_side_menu';
import RightSideBar from '../commen/right_side_bar';
import { Helmet } from "react-helmet";
import { NavLink, useNavigate } from 'react-router-dom';
import '../TaskCss/calculator.css'
function Calculator() {
    useEffect(() => {
        if (!localStorage.getItem('userData')) {
            navigate('/')
        }
    }, []);
    const navigate = useNavigate();
    const [result, setResult] = useState('');

    const handleClick = (event) => {
        const buttonValue = event.target.value;
        const lastChar = result.slice(-1);
        let newResult = '';
        if ((lastChar == "+" || lastChar == "-" || lastChar == "*" || lastChar == "/") && (buttonValue == "+" || buttonValue == "-" || buttonValue == "*" || buttonValue == "/")) {
            newResult = result.slice(0, -1) + buttonValue;
        } else {
            newResult = result + buttonValue;
        }

        setResult(newResult);

    };
    const clearScreen = () => {
        setResult("");
    };
    const claculate = () => {
        setResult(eval(result).toString());
    };

    return (
        <>
            <Helmet>
                <title>Admin Panel | Calculator </title>
            </Helmet>
            <Header />
            <LeftSideMenu />
            <div className="content-page">
                <div className="content">
                    <div className="container">
                        <table
                            border={2}
                            align="center"
                            cellPadding={15}
                            cellSpacing={12}
                            bgcolor="#c0c0c0"
                        >
                            <tbody>
                                <tr>
                                    <td>
                                        <input type="text" name="Input" size={35} value={result} id="display" readOnly />
                                        <br />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input
                                            type="button"
                                            name="one"
                                            style={{ fontSize: 30 }}
                                            defaultValue={1}
                                            onClick={handleClick}
                                        />
                                        <input
                                            type="button"
                                            name="two"
                                            style={{ fontSize: 30 }}
                                            defaultValue={2}
                                            onClick={handleClick}
                                        />
                                        <input
                                            type="button"
                                            name="three"
                                            style={{ fontSize: 30 }}
                                            defaultValue={3}
                                            onClick={handleClick}
                                        />
                                        <input
                                            type="button"
                                            name="add"
                                            className="btnTop"
                                            style={{ fontSize: 30 }}
                                            defaultValue="+"
                                            onClick={handleClick}
                                        />
                                        <br />
                                        <input
                                            type="button"
                                            name="four"
                                            style={{ fontSize: 30 }}
                                            defaultValue={4}
                                            onClick={handleClick}
                                        />
                                        <input
                                            type="button"
                                            name="five"
                                            style={{ fontSize: 30 }}
                                            defaultValue={5}
                                            onClick={handleClick}
                                        />
                                        <input
                                            type="button"
                                            name="six"
                                            style={{ fontSize: 30 }}
                                            defaultValue={6}
                                            onClick={handleClick}
                                        />
                                        <input
                                            type="button"
                                            name="minus"
                                            style={{ fontSize: 30 }}
                                            defaultValue="-"
                                            onClick={handleClick}
                                        />
                                        <br />
                                        <input
                                            type="button"
                                            name="seven"
                                            style={{ fontSize: 30 }}
                                            defaultValue={7}
                                            onClick={handleClick}
                                        />
                                        <input
                                            type="button"
                                            name="eight"
                                            style={{ fontSize: 30 }}
                                            defaultValue={8}
                                            onClick={handleClick}
                                        />
                                        <input
                                            type="button"
                                            name="nine"
                                            style={{ fontSize: 30 }}
                                            defaultValue={9}
                                            onClick={handleClick}
                                        />
                                        <input
                                            type="button"
                                            name="mul"
                                            style={{ fontSize: 30 }}
                                            defaultValue="*"
                                            onClick={handleClick}
                                        />
                                        <br />
                                        <input
                                            type="button"
                                            name="clear"
                                            style={{ fontSize: 30 }}
                                            defaultValue=" c "
                                            onClick={clearScreen}
                                        />
                                        <input
                                            type="button"
                                            name="zero"
                                            style={{ fontSize: 30 }}
                                            defaultValue={0}
                                            onClick={handleClick}
                                        />
                                        <input
                                            type="button"
                                            name="DoIt"
                                            style={{ fontSize: 30 }}
                                            defaultValue=" = "
                                            onClick={claculate}
                                        />
                                        <input
                                            type="button"
                                            name="div"
                                            style={{ fontSize: 30 }}
                                            defaultValue="/"
                                            onClick={handleClick}
                                        />
                                        <br />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <RightSideBar />
        </>
    )
}
export default Calculator;