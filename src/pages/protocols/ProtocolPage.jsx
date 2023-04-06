import React from 'react';
import { useParams } from 'react-router-dom';

const ProtocolPage = () => {
  const { protocolId } = useParams(); // get the protocol ID from the URL params

  // you can fetch data for this protocol from your backend API here
  // for example, you could use the protocol ID to make an API request for analytics data

  return (
    <div className="pt-20">
      <h1>Protocol Page for {protocolId}</h1>
      {/* Display the analytics data for the protocol here */}
    </div>
  );
};

export default ProtocolPage;
