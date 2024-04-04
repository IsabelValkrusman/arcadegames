import React from 'react';
import { useParams } from 'react-router-dom';

const PriceScreen = () => {
    const { id } = useParams();

    return (
        <div className="container text-center">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="info-box">
                        <h1>Hinnad</h1>
                        <div className="info-container">
                            <p>
                                <strong>Kuni südaööni:</strong>
                                <br />
                                - Täiskasvanud: 10€<br />
                                - Lapsed (kuni 12-aastased): 8€<br />
                                - Väikelapsed (kuni 1,0 m): Tasuta<br />
                                - Grupid (alates 20 inimest, eelnev registreerimine vajalik): 8€ inimene<br />
                                - Pensionärid: 8€<br />
                                - Puuetega inimesed: 8€<br />
                                - Puudega inimese saatjad: 8€
                            </p>
                            <p>
                                <strong>Pärast südaööd:</strong>
                                <br />
                                - Täiskasvanud: 15€<br />
                                - Lapsed (kuni 12-aastased): 12€<br />
                                - Väikelapsed (kuni 1,0 m): Tasuta<br />
                                - Grupid (alates 20 inimest, eelnev registreerimine vajalik): 12€ inimene<br />
                                - Pensionärid: 12€<br />
                                - Puuetega inimesed: 12€<br />
                                - Puudega inimese saatjad: 12€
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PriceScreen;
