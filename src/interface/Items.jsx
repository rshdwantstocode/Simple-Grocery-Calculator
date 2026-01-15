import { useState } from "react";

const Items = ({ groceryItems, addToCart }) => {

    const [searchTerm, setSearchTerm] = useState("");

    const filteredItems = groceryItems.filter(groceryItem =>
        groceryItem.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const clearSearch = () => {
        setSearchTerm('');
    };

    return (
        <div className=" w-4/6 flex flex-col">
            <span className="w-full flex max-[1025px]:w-160">
                <input type="text" name="prod-search" id="prod-search"
                    className="bg-[#C8AAAA] w-240 m-2 p-1 pl-3 text-white rounded-md"
                    placeholder="Search Product"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit"
                    onClick={() => clearSearch()}
                    className="cursor-pointer m-2 p-1 rounded-md bg-[#C8AAAA]">

                    {searchTerm === "" ?
                        (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        )}

                </button>
            </span>


            <span className="flex flex-wrap p-2 overflow-y-auto transparent-track hover:thumb-visible 
            max-[1025px]:w-160 max-[1025px]:justify-center"
                style={{ height: '650px' }}>
                {
                    filteredItems.length === 0 ? (
                        <p className="text-white text-lg">No items found.</p>
                    ) :
                        filteredItems.map(groceryItem => {
                            return (
                                <span className="w-58 p-5 bg-[#FFDAB3] 
                                flex justify-center text-center flex-col rounded-lg border m-2 gap-2 hover:scale-105 cursor-pointer
                                max-[1025px]:w-45 max-[1025px]:p-3"
                                    key={groceryItem.id}
                                    onClick={() => addToCart(groceryItem)}
                                >
                                    <p className="font-bold text-lg">{groceryItem.name}</p>
                                    <span className="w-32 self-center">
                                        <img className=" rounded-md" src={groceryItem.image} alt={groceryItem.name} />
                                    </span>
                                    <p className="font-bold">${groceryItem.price} </p>
                                    <p className="text-green-800 font-semibold">Stocks: {groceryItem.stock} </p>
                                </span>
                            )
                        })
                }
            </span>
        </div>
    );
};

export default Items;