import { useState } from "react";
import Dialog from "./Dialog.jsx";

const Calculations = ({
    cart,
    updateQuantity,
    removeFromCart,
    totalAmount,
    totalQuantity,
    clearCart
}) => {

    const [cashAmount, setCashAmount] = useState('');
    const [showDialog, setShowDialog] = useState(null);

    const handleCashInput = (number) => {
        if (number === 'CLR') {
            setCashAmount('');
        } else if (number === '.') {
            // Only add decimal if there isn't one already
            setCashAmount(prev => {
                const str = prev.toString();
                if (str.includes('.')) return prev;
                return str === '' || str === '0' ? '0.' : str + '.';
            });
        } else if (number === '00') {
            setCashAmount(prev => {
                const str = prev.toString();
                return str === '' ? '0' : str + '00';
            });
        } else {
            setCashAmount(prev => {
                const str = prev.toString();
                return str === '' || str === '0' ? number.toString() : str + number;
            });
        }
    }

    // checkout function
    const handleCheckout = () => {
        const parsedCash = parseFloat(cashAmount) || 0;
        const parsedTotal = parseFloat(totalAmount);

        if (cart.length === 0) {
            setShowDialog({ message: "Cart is empty!" });
            return;
        }

        if (parsedCash < parsedTotal) {
            setShowDialog({ message: `Insufficient cash amount! total is $${totalAmount}` });
            return;
        } else {
            setShowDialog({ message: 'Checkout successful!' });
            setCashAmount('');
            clearCart();
        }
    }

    // backspace function
    const backspace = () => {
        setCashAmount(prev => {
            const cash = prev.toString();
            return cash.length > 0 ? cash.slice(0, -1) : '';
        })
    }

    // not available function
    const notAvailable = () => {
        setShowDialog({ message: "This featrure is not available yet!" });
    }

    return (
        <div className="bg-[#9F8383] w-2/6 rounded-md max-[1025px]:w-145">

            {showDialog && (
                <Dialog
                    message={showDialog.message}
                    onClose={() => setShowDialog(null)}
                />
            )}

            {/* ORder summary */}
            <div className="h-70">
                <h2 className="text-xl font-bold text-white px-2">Order Summary</h2>
                <span className="h-[34vh] overflow-y-auto transparent-track hover:thumb-visible block ">
                    {/* items will be mapped here */}
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-white">
                            <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <p>Cart is empty</p>
                            <p className="text-xs mt-1">Click items to add them</p>
                        </div>
                    ) : cart.map((cartItem) => {
                        const leftButton = cartItem.quantity > 1 ? (
                            <button
                                onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)}
                                className="mr-2 text-xs text-red-300 hover:text-red-100 cursor-pointer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </button>) : (
                            <button
                                onClick={() => removeFromCart(cartItem.id)}
                                className="mr-2 text-xs text-red-300 hover:text-red-100 cursor-pointer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>);

                        return (
                            <span className="flex justify-between p-2 border-b border-gray-300">
                                <span className="flex">
                                    {leftButton}
                                    <span className="text-white">{cartItem.name} x {cartItem.quantity}</span>
                                </span>
                                <span className="text-white">${cartItem.price}</span>
                            </span>
                        )
                    })}
                </span>
            </div>

            {/* buttons */}
            <div className="flex flex-col items-center">
                <span className="h-[20vh] bg-white w-full rounded-md">
                    {/* total display */}
                    <div className="flex flex-col items-end p-2">
                        <span className="flex justify-between w-full mb-2 items-center">
                            <span className="text-gray-600 font-semibold">Total:</span>
                            <span className="text-3xl font-bold">${totalAmount}</span>
                        </span>

                        <span className="flex justify-between w-full mb-1 items-center">
                            <span className="text-gray-600 font-semibold">Quantity:</span>
                            <span className="text-sm text-gray-600">{totalQuantity}</span>
                        </span>


                        <span className="flex justify-between w-full mb-1 items-center">
                            <span className="text-gray-600 font-semibold">Cash:</span>
                            <span className="flex items-center gap-1">
                                <p>$</p>
                                <input type="text"
                                    className="text-md font-semibold text-end border border-gray-300 rounded p-1"
                                    placeholder="$0.00"
                                    value={cashAmount}
                                    min={0}
                                    readOnly />
                            </span>
                        </span>
                        <span className="flex justify-between w-full mb-2 items-center">
                            <span className="text-gray-600 font-semibold">Change:</span>
                            <span className="text-md font-bold">${((parseFloat(cashAmount) || 0) - parseFloat(totalAmount)).toFixed(2)}</span>
                        </span>
                    </div>
                </span>

                <span>
                    <span className="flex justify-center m-1 gap-2">
                        <button className="payment-option">CASH</button >
                        <button className="payment-option" onClick={() => notAvailable()}>QRPH</button >
                        <button className="payment-option" onClick={() => notAvailable()}>CARD</button >
                    </span>

                    <span className=" flex p-1 gap-1.5">
                        {/* numbers */}
                        <span className="flex w-60vw gap-1">
                            <span className="flex flex-col gap-1">
                                <button onClick={() => handleCashInput(1)} className="calc-button">1</button>
                                <button onClick={() => handleCashInput(4)} className="calc-button">4</button>
                                <button onClick={() => handleCashInput(7)} className="calc-button">7</button>
                                <button onClick={() => handleCashInput('00')} className="calc-button">00</button>
                            </span>
                            <span className="flex flex-col gap-1">
                                <button onClick={() => handleCashInput(2)} className="calc-button">2</button>
                                <button onClick={() => handleCashInput(5)} className="calc-button">5</button>
                                <button onClick={() => handleCashInput(8)} className="calc-button">8</button>
                                <button onClick={() => handleCashInput(0)} className="calc-button">0</button>
                            </span>
                            <span className="flex flex-col gap-1">
                                <button onClick={() => handleCashInput(3)} className="calc-button">3</button>
                                <button onClick={() => handleCashInput(6)} className="calc-button">6</button>
                                <button onClick={() => handleCashInput(9)} className="calc-button">9</button>
                                <button onClick={() => handleCashInput('.')} className="calc-button">.</button>
                            </span>
                        </span>
                        {/* misc buttons */}
                        <span className="w-40vw flex flex-col gap-1">
                            <span className="flex gap-1">
                                <button className="delete calc-button misc-button"
                                    onClick={() => backspace()}
                                >X</button>
                                <button className="tax calc-button misc-button" onClick={() => notAvailable()}>Tax</button>
                            </span>

                            <span className="flex gap-1">
                                <button className="calc-button misc-button"
                                    onClick={() => handleCashInput('CLR')}>
                                    CLR</button>
                                <button className="disc calc-button misc-button" onClick={() => notAvailable()}>Disc</button>
                            </span>

                            <span className="flex gap-1">
                                <button className="hold calc-button misc-button" onClick={() => notAvailable()}>Hold</button>
                                <button className="void calc-button misc-button" onClick={() => notAvailable()}>Void</button>
                            </span>

                            <span className="flex gap-1">
                                <button className="bg-[#C8AAAA] border border-black h-10 w-47 rounded-md cursor-pointer
                                " onClick={() => notAvailable()}>
                                    Open</button>
                            </span>
                        </span>
                    </span>

                    <span className="flex justify-center">
                        <button className="text-center p-1 bg-[#FFDAB3] w-124 h-9 rounded-md text-black font-semibold cursor-pointer"
                            onClick={() => handleCheckout()}>
                            Checkout
                        </button>
                    </span>
                </span>
            </div>
        </div>
    );
}

export default Calculations;