const Dialog = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm "> {/* Overlay */}
            <div className="bg-white p-6 rounded-md shadow-md w-80 text-center"> {/* Dialog box */}
                <p className="mb-4 text-black">{message}</p>
                <button
                    onClick={onClose}
                    className="bg-[#C8AAAA] text-black px-4 py-2 rounded-md hover:bg-[#A89A9A] transition-colors">
                    Close
                </button>
            </div>
        </div>
    );
}

export default Dialog;