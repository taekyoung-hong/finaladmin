import React from 'react';
import styles from '../styles/ad401.module.css'
import TextField from '@mui/material/TextField';


function page(props) {
    return (
        <>

            <div className={styles.ad401__main_background_color}>
                <div className={styles.ad401__main_container}>
                    <p className={styles.ad401__main_name}>의약품 정의</p>
                    <div className={styles.ad401__main_cotainer_box}>
                        <div className={styles.ad401__main_title}>메인 타이틀</div>
                        <div>
                            <TextField fullWidth label="메인 타이틀" id="fullWidth" className={styles.TextField} 
                            sx={{marginTop:"5px"}}
                            

                            
                            />
                        </div>
                    </div>

                    <div className={styles.ad401__main_content_textarea}>
                        <div className={styles.ad401__main_content}>내용</div>
                        <div>
                            <TextField fullWidth label="내용" id="fullWidth" className={styles.TextField} 
                            sx={{marginTop:"5px"}} />
                        </div>
                    </div>


                    <div className={styles.ad401__sub1_cotainer_box}>
                        <div className={styles.ad401__sub1_title}>서브1 타이틀</div>
                        <div>
                            <TextField fullWidth label="서브1 타이틀" id="fullWidth" 
                            sx={{marginTop:"5px"}}
                            className={styles.TextField} />
                        </div>
                    </div>

                    <div className={styles.ad401__sub1_content_textarea}>
                        <div className={styles.ad401__sub1_content}>내용</div>
                        <div>
                            <TextField fullWidth label="" id="fullWidth" className={styles.TextField} 
                            sx={{marginTop:"5px"}}/>
                        </div>
                    </div>

                    <div className={styles.ad401__sub2_cotainer_box}>
                        <div className={styles.ad401__sub2_title}>서브2 타이틀</div>
                        <div>
                            <TextField fullWidth label="" id="fullWidth" className={styles.TextField} 
                            sx={{marginTop:"5px"}}/>
                        </div>
                    </div>

                    <div className={styles.ad401__sub2_content_textarea}>
                        <div className={styles.ad401__sub2_content}>내용</div>
                        <div>
                            <TextField fullWidth label="" id="fullWidth" className={styles.TextField} 
                            sx={{marginTop:"5px"}}/>
                        </div>
                    </div>

                    <div className={styles.ad401__sub3_cotainer_box}>
                        <div className={styles.ad401__sub3_title}>서브3 타이틀</div>
                        <div>
                            <TextField fullWidth label="" id="fullWidth" className={styles.TextField} 
                            sx={{marginTop:"5px"}}/>
                        </div>

                    </div>

                    <div className={styles.ad401__sub3_content_textarea}>
                        <div className={styles.ad401__sub3_content}>내용</div>
                        <div>
                            <TextField fullWidth label="" id="fullWidth" className={styles.TextField} 
                            sx={{marginTop:"5px"}}/>
                        </div>
                    </div>
                </div>
            </div>

        </>

    );
}

export default page;