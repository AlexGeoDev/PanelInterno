import React from 'react';

function Modal(props) {
    return (
        <React.Fragment>
            <div className="modal-container">
                <div className="modal-content">
                    {
                        props.title &&
                        (
                            <div>
                                {props.title}
                            </div>
                        )
                    }
                    <div className="modal-content-children">
                        {props.children}
                    </div>

                    {
                        props.footer &&
                        (
                            <div className="footer">
                                {props.footer}
                            </div>
                        )
                    }

                </div>
            </div>

            <style jsx>
                {`
                    .modal-container{
                        border:0;
                        background-color:rgba(0,0,0,0.3);
                        z-index:100;
                        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
                        position: fixed;
                        top:0;
                        left:0;
                        right:0;
                        bottom:0;
                        display:flex;
                        justify-content:center;
                        align-items:center;
                    }
                    .modal-content{
                        text-align:left;
                        background-color:white;
                        z-index:100;
                        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
                        max-width: 600px;
                    }
                    .modal-content-children{
                        text-align:left;
                        background-color:white;
                        display:flex;
                        flex-direction:column;
                    }
                    .footer{
                        margin-top:1rem;
                        margin-bottom:1rem;
                    }
                    `
                }
            </style>
        </React.Fragment >

    );
}

export { Modal };