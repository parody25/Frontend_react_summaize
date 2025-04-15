import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store'; // Adjust the path to your store
import { formatText } from '../../../utilities/formatText';

const BorrowerHistoryForm: React.FC<{ isEditable: boolean;}> = ({ isEditable})=> {
    const { summary: data, loading, error } = useSelector((state: RootState) => state.webScraping);


    return (
        <textarea
            id="scrapedData"
            value={loading ? 'Loading...' : error || (data ? formatText(data) : '')}
            readOnly={false}
            rows={Math.max(1, Math.ceil((data || '').length / 50))} // Adjust rows dynamically
            style={{ width: '100%' }}
            disabled={!isEditable}
        />
    );
};

export default BorrowerHistoryForm;
