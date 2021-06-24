
import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row, message } from "antd";
import CakeModal from "../components/CakeModal";
import UploadModal from '../components/UploadModal';
import { CakesType, CakesArrayType, ErrorType } from '../types/types'
import { request } from '../API/request'
import Loading from '../components/Loading';
import './Home.scss'
import Logo from '../components/Logo';


const Home = () => {
    const [cake, setCake] = useState<CakesType>({});
    const [showModal, setShowModal] = useState(Boolean)
    const [Cakes, setCakes] = useState<CakesArrayType>([])
    const [addModalVisibility, setAddModalVisibility] = useState(Boolean)
    const { Meta } = Card;
    const [loading, setloading] = useState(true)
    const toggleAddVisibility = () => {
        setAddModalVisibility(!addModalVisibility)
    }
    const getCakes = async () => {
        setloading(true)
        try {
            let response: any
            response = await request({}, 'get', '/cakes')
            if (!response.error) {
                setCakes(response)
                setloading(false)
            } else {
                message.error('Get Failed')
                setloading(false)
            }

        } catch (error) {
            message.error('Error Getting Cakes')
            setloading(false)
        }
    }

    useEffect(() => {
        getCakes()
    }, [])


    const CakesList = () => {
        return Cakes.map((cake: CakesType, index: number) => {
            const { imageurl, name, comment, id } = cake;

            return <Col span={4} key={id}>
                <Card
                    hoverable
                    bordered
                    onClick={() => {
                        setCake(cake);
                        setShowModal(true);
                    }}
                    className={'cake-card'}
                    title={<img className='image-cake' alt={'Cake'} src={imageurl} />}
                >
                    <Meta title={name} description={comment && comment.length > 35 ? comment?.substring(0, 20) + '...' : comment} />
                </Card>
            </Col>
        })
    };

    const addCake = async (values: CakesType) => {
        try {
            let response: any
            response = await request(values, 'post', '/cakes')
            if (!response.error) {
                message.success('Cake Added Successfully')
                getCakes()
            } else {
                message.error('Error Adding Cake')
            }

        } catch (error) {
            message.error('Error Adding Cake')
        }
    }

    const deleteCake = async (cake: CakesType) => {
        try {
            let response: any
            response = await request({ id: cake.id }, 'delete', '/cakes')
            if (!response.error) {
                message.success('Cake deleted successfully')
                setCakes([...Cakes.filter((item: CakesType) => item.id !== cake.id)])
            } else {
                message.error('Error deleting cake')
            }

        } catch (error) {
            message.error('Error deleting cake')
        }

    }

    if (loading) {
        return <Loading />
    }
    else {
        return (
            <div className='main-wrapper'>
                <div className='header'><Logo /><Button type={'primary'} onClick={toggleAddVisibility}>Add New</Button></div>
                <Row gutter={[16, 16]}>
                    {CakesList()}
                </Row>
                <CakeModal cake={cake} deleteCake={deleteCake} visible={showModal} closeModal={() => setShowModal(false)} />
                <UploadModal addCake={addCake} toggleModal={toggleAddVisibility} visible={addModalVisibility} />
            </div>
        );
    }
};

export default Home;
