import React from 'react';

const ProtocolAddress = ({ address }) => {
  const [blockchain, addr] = address.split(':');
  let link;

  switch (blockchain) {
    case 'eth':
      link = `https://etherscan.io/address/${addr}`;
      break;
    case 'bsc':
      link = `https://bscscan.com/address/${addr}`;
      break;
    case 'polygon':
      link = `https://polygonscan.com/address/${addr}`;
      break;
    case 'avax':
      link = `https://cchain.explorer.avax.network/address/${addr}`;
      break;
    case 'tron':
      link = `https://tronscan.org/#/address/${addr}`;
      break;
    default:
      link = null;
      break;
  }

  const handleClick = () => {
    if (link) {
      window.open(link, '_blank');
    }
  };

  return (
    <button className="px-4 py-2 rounded bg-gray-900 w-fit hover:bg-gray-600" onClick={handleClick}>
      Check out on blockchain
    </button>
  );
};

export default ProtocolAddress;
