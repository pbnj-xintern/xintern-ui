/** @jsx jsx */ import { jsx } from '@emotion/core'
import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Input, Modal, Form, Button } from 'antd'

const AddCompanyModal = (props) => {
    let hidden = props.isHidden
    const [isLoading, setIsLoading] = useState(false)
    const [companyPayload, setCompanyPayload] = useState({
        name: "",
        location: "",
        logo: "http://www.14riverside.com/wp-content/uploads/2015/12/placeholder-company.png"
    })

    const handleAddCompany = async () => {
        setIsLoading(true)
        try {
            let response = await axios.post('/company/', companyPayload)
            if (response.status === 201) {
                setIsLoading(false)
                console.log(response.data)
                hidden = true
                toast.success("Company Added!")                
            }
        } catch (err) {
            console.error(err.message)
            setIsLoading(false)
            toast.error("Failed to add Company.")
        }
    }

    const onInputChange = (e, key) => {
        let newPayload = { ...companyPayload }
        newPayload[key] = (e.target) ? e.target.value : e
        setCompanyPayload(newPayload)
    }

    return (
        <Modal
            visible={!hidden}
            title="Add a Company"
            onOk={handleAddCompany}
            onCancel={props.hideModal}
            footer={[
                <Button key="back" onClick={props.hideModal}>
                    Cancel
                </Button>,
                <Button key="submit" disabled={isLoading} type="primary" loading={isLoading} onClick={handleAddCompany}>
                    Add Company
                </Button>,
            ]}
        >
            <Form layout="vertical">
                <Form.Item label="Company Name">
                    <Input onChange={e => onInputChange(e, 'name') } />
                </Form.Item>
                <Form.Item label="Location (City, Province/State)">
                    <Input onChange={e => onInputChange(e, 'location') } />
                </Form.Item>
                {/* <Form.Item label="Company Logo (URL)">
                    <Input onChange={e => onInputChange(e, 'logo') } />
                </Form.Item> */}
            </Form>
        </Modal>
    )
}

export default AddCompanyModal