/** @jsx jsx */ import { jsx } from '@emotion/core'
import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Icon, Input, Button, Tooltip, Divider, Select, Rate } from 'antd'
import * as styles from './create-review.emotion'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useLocation, useHistory } from 'react-router-dom'
import AddCompanyModal from '../../components/add-company-modal/add-company-modal'

const getAllCompanies = async () => {
    let response = await axios.get('/company/all')
    if (response.data.length == 0 || response.data.error) {
        console.error("no locations found")
        return []
    }
    return response.data
}

const getCompanyLocations = async (companyName) => {
    let qParams = {
        params: {
            company_name: companyName
        }
    }
    let response = await axios.get('/company/locations', qParams)
    if (response.data.length == 0 || response.data.error) {
        console.error("no locations found")
        return []
    }
    return response.data
}

// ------ MAIN COMPONENT ------
const CreateReviewForm = (props) => {
    let location = useLocation()
    let history = useHistory()
    let pathCompanyName = location.pathname.split("/")[2]

    const { Option } = Select
    const { TextArea } = Input

    const [isLoading, setIsLoading] = useState(false)
    const [companyLocations, setCompanyLocations] = useState([])
    const [companyList, setCompanyList] = useState([])
    const [isModalHidden, setIsModalHidden] = useState(true)
    const [payload, setPayload] = useState({
        culture: 0,
        mentorship: 0,
        impact: 0,
        interview: 0,
        company_name: (pathCompanyName !== "create") ? pathCompanyName : "",
        location: "",
        salary: 0,
        content: "",
        position: "",
        currency: "",
        payPeriod: ""
    })

    const currencyOptions = ['CAD', 'USD', 'AUD', 'EUR']
    const payPeriodOptions = ["MONTHLY", "HOURLY", "WEEKLY"]

    useEffect(() => {
        window.scrollTo({ top: 0 })

        const fetchCompanyLocations = async () => {
            if (pathCompanyName !== "create") {
                setCompanyLocations(await getCompanyLocations(pathCompanyName))
            } else {
                setCompanyLocations(await getCompanyLocations(payload.company_name))
            }
        }
        const fetchAllCompanies = async () => {
            setCompanyList(await getAllCompanies())
        }
        fetchCompanyLocations()
        fetchAllCompanies()
    }, [payload.company_name])

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        }
    }

    const tailFormItemLayout = {
        wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 },
            xl: { span: 4, offset: 10 }
        }
    }

    const showModal = () => {
        setIsModalHidden(false)
    }

    const hideModal = () => {
        setIsModalHidden(true)
    }

    const onFieldChange = (e, key) => {
        let newPayload = { ...payload }
        if (key === "salary") {
            newPayload[key] = parseInt(e.target.value)
        } else {
            newPayload[key] = (e.target) ? e.target.value : e
        }
        setPayload(newPayload)
    }

    //createReview endpoint
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        console.log('payload changed:\n', payload)
        try {
            let response = await axios.post("/review", payload)
            console.log('create review res:\n', response.data)
            if (!response) {
                toast.error("Something went wrong. Could not post Review.")
                setIsLoading(false)
                return
            }

            if (response.status === 201) {
                toast("Review created!")
                setIsLoading(false)
                history.push(`/company/${payload.company_name}/reviews`)
            }
            console.log('loading state:', isLoading)
        } catch (err) {
            console.error(err.message)
            toast.error("Missing Fields. Could not create Review.")
            setIsLoading(false)
        }
    }

    const stateCallback = {
        modalActiveFn: () => setIsModalHidden(true),
        changePayload: (n, l) => setPayload({
            ...payload,
            company_name: n,
            location: l
        })
    }

    return (
        <Row style={{ height: "100%", width: "100%", paddingTop: "7em", paddingBottom: "3%", background: "#F5FcFF" }} >
            <Col xl={{ span: 16, offset: 4 }} css={styles.CreateReviewCol}>
                <h1 style={{ paddingTop: "5%", paddingBottom: "3%" }}>{(pathCompanyName !== "create") ? `${pathCompanyName}: Review` : "Create a Review!"}</h1>
                <Form {...formItemLayout} onSubmit={handleSubmit} >
                    <Row style={{ paddingBottom: "0.5%" }}>
                        <Col xl={{ span: 11, offset: 1 }}>
                            <Form.Item label="Company" labelCol={{ span: 6, offset: 1 }} labelAlign="left">
                                {(pathCompanyName !== "create") ?
                                    <Select disabled defaultValue={pathCompanyName}>
                                        <Option value={pathCompanyName}>{pathCompanyName}</Option>
                                    </Select> :
                                    <Select showSearch
                                        value={payload.company_name}
                                        placeholder="Select a Company"
                                        onChange={e => onFieldChange(e, 'company_name')}
                                        dropdownRender={menu => (
                                            <div>
                                                {menu}
                                                <Divider style={{ margin: '1.5px 0' }} />
                                                <div
                                                    css={styles.AddCompanyDropdown}
                                                    style={{ padding: '9.5px', cursor: 'pointer' }}
                                                    onMouseDown={e => e.preventDefault()}
                                                    onClick={showModal}
                                                >
                                                    <Icon type="plus" /> Add Company
                                                    </div>
                                            </div>
                                        )}
                                    >
                                        {companyList.map((company, i) => <Option key={i} value={company.name}>{company.name}</Option>)}
                                    </Select>}
                            </Form.Item>
                            <AddCompanyModal
                                stateCallback={stateCallback}
                                isHidden={isModalHidden}
                                hideModal={hideModal}
                            />
                        </Col>
                        <Col xl={{ span: 8, offset: 0 }}>
                            <Form.Item label="Location" labelCol={{ span: 7, offset: 1 }} labelAlign="left">
                                <Select 
                                    showSearch 
                                    placeholder="Select a Location" 
                                    onChange={e => onFieldChange(e, 'location')}
                                    value={payload.location}>
                                    {companyLocations.map((location, i) => <Option key={i} value={location}>{location}</Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={{ span: 24, offset: 0 }} style={{ paddingLeft: "6%" }}>
                            <Form.Item label="Culture" labelCol={{ span: 4, offset: 0 }} labelAlign="left">
                                <Col xl={{ span: 7 }}>
                                    <Rate allowHalf value={payload.culture} onChange={e => onFieldChange(e, 'culture')} />
                                </Col>
                            </Form.Item>
                            <Form.Item label="Mentorship" labelCol={{ span: 4, offset: 0 }} labelAlign="left">
                                <Col xl={{ span: 7 }}>
                                    <Rate allowHalf value={payload.mentorship} onChange={e => onFieldChange(e, 'mentorship')} />
                                </Col>
                            </Form.Item>
                            <Form.Item label="Impact" labelCol={{ span: 4, offset: 0 }} labelAlign="left">
                                <Col xl={{ span: 7 }}>
                                    <Rate allowHalf value={payload.impact} onChange={e => onFieldChange(e, 'impact')} />
                                </Col>
                            </Form.Item>
                            <Form.Item label="Interview" labelCol={{ span: 4, offset: 0 }} labelAlign="left">
                                <Col xl={{ span: 7 }}>
                                    <Rate allowHalf value={payload.interview} onChange={e => onFieldChange(e, 'interview')} />
                                </Col>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row style={{ paddingBottom: "1%" }}>
                        <Col xl={{ span: 24, offset: 0 }}>
                            <Form.Item label="Position" labelCol={{ span: 3, offset: 1 }} labelAlign="left" style={{ paddingLeft: "2%" }}>
                                <Input placeholder={`"Software Developer"`} value={payload.position} onChange={e => { onFieldChange(e, 'position') }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row style={{ paddingBottom: "1%" }}>
                        <Col xl={{ span: 12, offset: 0 }} style={{ paddingLeft: "2.5%" }}>
                            <Form.Item label="Salary ($)" labelCol={{ span: 7, offset: 0 }} labelAlign="left" style={{ paddingLeft: "7.5%" }}>
                                <Input type="number" onChange={e => onFieldChange(e, 'salary')} />
                            </Form.Item>
                        </Col>
                        <Col xl={{ span: 6, offset: 0 }}>
                            <Form.Item label="Currency" labelCol={{ span: 8, offset: 0 }} labelAlign="left">
                                <Select placeholder="Select a Currency" onChange={e => onFieldChange(e, 'currency')}>
                                    {currencyOptions.map((currency, i) => <Option key={i} value={currency}>{currency}</Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={{ span: 10, offset: 1 }} style={{ paddingLeft: "1.8%", paddingBottom: "1%" }}>
                            <Form.Item label="Pay Period" labelCol={{ span: 7, offset: 0 }} labelAlign="left">
                                <Select placeholder="Select a Pay Period" onChange={e => onFieldChange(e, 'payPeriod')}>
                                    {payPeriodOptions.map((pp, i) => <Option key={i} value={pp}>{pp}</Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={{ span: 23, offset: 1 }}>
                            <Form.Item label="Review" labelCol={{ span: 3, offset: 0 }} labelAlign="left" style={{ paddingLeft: "2%" }}>
                                <TextArea value={payload.content} onChange={e => onFieldChange(e, 'content')} placeholder="Write something nice! (Or not)" autoSize={{ minRows: 8, maxRows: 24 }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" disabled={isLoading} loading={isLoading}>
                            Create Review
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}

const WrappedCreateReviewForm = Form.create({ name: 'create-review-form' })(CreateReviewForm);

export default WrappedCreateReviewForm
