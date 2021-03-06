import React from 'react'
import {$get, $post, $put, img} from '../../utils/global'
import {
    Card,
    Modal,
    Icon,
    DatePicker,
    Drawer,
    List,
    Avatar,
    Divider,
    Col,
    Row,
    Button,
    Form,
    Input,
    Radio,
    InputNumber, Checkbox, Select
} from 'antd'

import { Rate } from 'antd';

import './activityPanel.css'

import {Empty} from 'antd'
import moment from 'moment'
import {PictureUploader} from '../pictureUploader/pictureUploader'

const pStyle = {
    fontSize: 16,
    color: 'rgba(0,0,0,0.85)',
    lineHeight: '24px',
    display: 'block',
    marginBottom: 16,
}

const DescriptionItem = ({title, content}) => (
    <div
        style={{
            fontSize: 14,
            lineHeight: '22px',
            marginBottom: 7,
            color: 'rgba(0,0,0,0.65)',
        }}
    >
        <p
            style={{
                marginRight: 8,
                display: 'inline-block',
                color: 'rgba(0,0,0,0.85)',
            }}
        >
            {title}:
        </p>
        {content}
    </div>
)

const ActivityUpdateForm = Form.create({name: 'activity_update'})(
    class extends React.Component {
        render() {
            const {visible, onCancel, onCreate, form, activity} = this.props
            const {getFieldDecorator} = form
            const children = []
            $get('/clubs/list').then(res => {
                if (res.success) {
                    let clubs = res.data.clubs.map(item => {
                        return {
                            id: item.id,
                            name: item.name
                        }
                    })
                    for (let i = 0; i < clubs.length; i++) {
                        let club = clubs[i]
                        children.push(<Select.Option key={club.name}>{club.name}</Select.Option>)
                    }
                }
            })
            return (
                <Modal
                    visible={visible}
                    title="编辑活动信息"
                    okText="确定"
                    cancelText={'取消'}
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="活动名称">
                            {getFieldDecorator('name', {
                                initialValue: activity.name
                            })(<Input disabled/>)}
                        </Form.Item>
                        <Form.Item label="活动地点">
                            {getFieldDecorator('position', {
                                initialValue: activity.place,
                                rules: [{required: true, message: '请输入活动地点'}],
                            })(<Input/>)}
                        </Form.Item>
                        <Form.Item label="活动描述">
                            {getFieldDecorator('description', {
                                initialValue: activity.description,
                                rules: [{required: true, message: '请输入活动描述'}],
                            })(<Input.TextArea rows={5}/>)}
                        </Form.Item>
                        <Form.Item label="开始时间">
                            {getFieldDecorator('start_time')(
                                <DatePicker placeholder={'未选择则保持不变'} showTime format="YYYY-MM-DD HH:mm:ss"/>,
                            )}
                        </Form.Item>
                        <Form.Item label="结束时间">
                            {getFieldDecorator('end_time')(
                                <DatePicker placeholder={'未选择则保持不变'} showTime format="YYYY-MM-DD HH:mm:ss"/>,
                            )}
                        </Form.Item>
                        <Form.Item label={'横板海报图片'}>
                            {getFieldDecorator('post_horizontal_image', {
                                valuePropName: 'fileList'
                            })(
                                <PictureUploader max={1}/>
                            )}
                        </Form.Item>
                        <Form.Item label={'竖版海报图片'}>
                            {getFieldDecorator('post_vertical_image', {
                                valuePropName: 'fileList'
                            })(
                                <PictureUploader max={1}/>
                            )}
                        </Form.Item>
                        <Form.Item label={'活动介绍推送标题'}>
                            {getFieldDecorator('introduction_article_title', {
                                initialValue: activity.introduction_article_title
                            })(
                                <Input/>
                            )}
                        </Form.Item>
                        <Form.Item label={'活动介绍推送链接'}>
                            {getFieldDecorator('introduction_article_url', {
                                initialValue: activity.introduction_article_url
                            })(
                                <Input/>
                            )}
                        </Form.Item>
                        <Form.Item label={'活动回顾推送标题'}>
                            {getFieldDecorator('retrospect_article_title', {
                                initialValue: activity.retrospect_article_title
                            })(
                                <Input/>
                            )}
                        </Form.Item>
                        <Form.Item label={'活动回顾推送链接'}>
                            {getFieldDecorator('retrospect_article_url', {
                                initialValue: activity.retrospect_article_url
                            })(
                                <Input/>
                            )}
                        </Form.Item>
                        <Form.Item label="活动大致规模（单位：人）">
                            {getFieldDecorator('max_people_limit', {
                                initialValue: activity.max_people_limit
                            })(<InputNumber min={1} max={2000}/>)}
                        </Form.Item>
                        <Form.Item label="是否需要报名" help={'本系统不提供报名功能，建议录入活动介绍的推送，或在活动下方评论区说明报名方式。'}>
                            {getFieldDecorator('need_enroll', {
                                valuePropName: 'checked',
                                initialValue: activity.need_enroll || false
                            })(
                                <Checkbox>
                                    需要报名
                                </Checkbox>
                            )}
                        </Form.Item>
                        <Form.Item label={'共同举办的社团（移除自己无效哦）'}>
                            {getFieldDecorator('host_clubs', {
                                initialValue: activity.host_clubs ? activity.host_clubs.map(item => {
                                    return item.name
                                }) : []
                            })(
                                <Select mode={'multiple'} placeholder={'请选择共同举办的社团'}>
                                    {children}
                                </Select>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            )
        }
    },
)

const ActivityUpdateForm2 = Form.create({name: 'activity_update'})(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const {visible, onCancel, onCreate, form, activity} = this.props
            const {getFieldDecorator} = form
            const children = []
            $get('/clubs/list').then(res => {
                if (res.success) {
                    let clubs = res.data.clubs.map(item => {
                        return {
                            id: item.id,
                            name: item.name
                        }
                    })
                    for (let i = 0; i < clubs.length; i++) {
                        let club = clubs[i]
                        children.push(<Select.Option key={club.name}>{club.name}</Select.Option>)
                    }
                }
            })
            return (
                <Modal
                    visible={visible}
                    title="活动评价"
                    okText="确定"
                    cancelText={'取消'}
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="活动名称">
                            {getFieldDecorator('name2', {
                                initialValue: activity.name
                            })(<Input disabled/>)}
                        </Form.Item>
                        <Form.Item label="活动评分">
                            <div>
                                <Rate allowClear={false} allowHalf defaultValue={3} />
                            </div>
                            {/*{getFieldDecorator('position', {*/}
                                {/*initialValue: activity.place,*/}
                                {/*rules: [{required: true, message: '请输入活动地点'}],*/}
                            {/*})(<Input/>)}*/}
                        </Form.Item>
                        <Form.Item label="评分理由">
                            {getFieldDecorator('reason', {
                                initialValue: "666",
                                rules: [{required: true, message: '请输入评分理由'}],
                            })(<Input.TextArea rows={5}/>)}
                        </Form.Item>
                        <Form.Item label="有无建议">
                            {getFieldDecorator('suggestion', {
                                initialValue: "6666",
                                rules: [{required: true, message: '请输入相关建议'}],
                            })(<Input.TextArea rows={5}/>)}
                        </Form.Item>

                    </Form>
                </Modal>
            )
        }
    },
)

const ActivityCreateForm = Form.create({name: 'activity_create'})(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const {visible, onCancel, onCreate, form, activity} = this.props
            const {getFieldDecorator} = form
            const children = []
            $get('/clubs/list').then(res => {
                if (res.success) {
                    let clubs = res.data.clubs.map(item => {
                        return {
                            id: item.id,
                            name: item.name
                        }
                    })
                    for (let i = 0; i < clubs.length; i++) {
                        let club = clubs[i]
                        children.push(<Select.Option key={club.name}>{club.name}</Select.Option>)
                    }
                }
            })
            return (
                <Modal
                    visible={visible}
                    title="新建活动"
                    okText="确定"
                    cancelText={'取消'}
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="活动名称">
                            {getFieldDecorator('name', {
                                    rules: [{required: true, message: '请输入活动名称'}]
                                }
                            )(<Input placeholder={'新建活动后，活动名称将不可修改'}/>)}
                        </Form.Item>
                        <Form.Item label="活动地点">
                            {getFieldDecorator('position', {
                                rules: [{required: true, message: '请输入活动地点'}],
                            })(<Input/>)}
                        </Form.Item>
                        <Form.Item label="活动描述">
                            {getFieldDecorator('description', {
                                rules: [{required: true, message: '请输入活动描述'}],
                            })(<Input.TextArea rows={5}/>)}
                        </Form.Item>
                        <Form.Item label="开始时间">
                            {getFieldDecorator('start_time', {
                                    rules: [{required: true, message: '请选择活动开始时间'}]
                                }
                            )(
                                <DatePicker placeholder={'请选择活动开始时间'} showTime format="YYYY-MM-DD HH:mm:ss"/>,
                            )}
                        </Form.Item>
                        <Form.Item label="结束时间">
                            {getFieldDecorator('end_time')(
                                <DatePicker placeholder={'请选择活动结束时间'} showTime format="YYYY-MM-DD HH:mm:ss"/>,
                            )}
                        </Form.Item>
                        <Form.Item label={'横板海报图片'}>
                            {getFieldDecorator('post_horizontal_image', {
                                valuePropName: 'fileList'
                            })(
                                <PictureUploader max={1}/>
                            )}
                        </Form.Item>
                        <Form.Item label={'竖版海报图片'}>
                            {getFieldDecorator('post_vertical_image', {
                                valuePropName: 'fileList'
                            })(
                                <PictureUploader max={1}/>
                            )}
                        </Form.Item>
                        <Form.Item label={'活动介绍推送标题'}>
                            {getFieldDecorator('introduction_article_title')(
                                <Input/>
                            )}
                        </Form.Item>
                        <Form.Item label={'活动介绍推送链接'}>
                            {getFieldDecorator('introduction_article_url')(
                                <Input/>
                            )}
                        </Form.Item>
                        <Form.Item label={'活动回顾推送标题'}>
                            {getFieldDecorator('retrospect_article_title')(
                                <Input/>
                            )}
                        </Form.Item>
                        <Form.Item label={'活动回顾推送链接'}>
                            {getFieldDecorator('retrospect_article_url')(
                                <Input/>
                            )}
                        </Form.Item>
                        <Form.Item label="活动大致规模（单位：人）">
                            {getFieldDecorator('max_people_limit', {})(<InputNumber min={1} max={2000}/>)}
                        </Form.Item>
                        <Form.Item label="是否需要报名" help={'本系统不提供报名功能，建议录入活动介绍的推送，或在活动下方评论区说明报名方式。'}>
                            {getFieldDecorator('need_enroll', {
                                valuePropName: 'checked',
                                initialValue: false
                            })(
                                <Checkbox>
                                    需要报名
                                </Checkbox>
                            )}
                        </Form.Item>
                        <Form.Item label={'共同举办的社团'}>
                            {getFieldDecorator('host_clubs')(
                                <Select mode={'multiple'} placeholder={'请选择共同举办的社团'}>
                                    {children}
                                </Select>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            )
        }
    },
)

export class ActivityPanel extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            clubId: props.match.params.club_id,
            activities: [],
            editVisible: false,
            editVisible2: false,
            createVisible: false,
            detailVisible: false,
            detail: {},
            detail2:{}
        }
    }

    componentDidMount() {
        this.refresh()
    }

    refresh() {
        const {clubId} = this.state
        $get('/clubs/admin/' + clubId + '/activity/index').then(res => {
            if (!res.success) {
                if (res.code === 600) {
                    Modal.confirm({
                        title: '获取社团活动列表失败',
                        content: '您并不拥有任何社团管理员权限',
                        okText: '我知道了',
                        cancelText: '好的',
                        onOk: () => {
                            this.props.history.push('/admin/index')
                        },
                        onCancel: () => {
                            this.props.history.push('/admin/index')
                        }
                    })
                } else if (res.code === 613) {
                    Modal.confirm({
                        title: '获取社团活动列表失败',
                        content: '您并不拥有管理这个社团的权限',
                        okText: '我知道了',
                        cancelText: '好的',
                        onOk: () => {
                            this.props.history.push('/admin/index')
                        },
                        onCancel: () => {
                            this.props.history.push('/admin/index')
                        }
                    })
                } else if (res.code === 602) {
                    Modal.confirm({
                        title: '社团不存在',
                        content: '请返回上一页重试',
                        okText: '我知道了',
                        cancelText: '好的',
                        onOk: () => {
                            this.props.history.push('/admin/index')
                        },
                        onCancel: () => {
                            this.props.history.push('/admin/index')
                        }
                    })
                }
            } else {
                this.setState({
                    activities: res.data.activities
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }

    showDetailInfo(id) {
        const {clubId} = this.state
        $get('/clubs/admin/' + clubId + '/activity/' + id).then(res => {
            if (res.success) {
                this.setState({
                    detailVisible: true,
                    detail: res.data.activity
                })
            }
        })
    }

    onDetailClose() {
        this.setState({
            detailVisible: false,
            detail: {}
        })
    }

    editActivity(id) {
        const {clubId} = this.state
        this.setState({
            detail: {}
        }, () => {
            $get('/clubs/admin/' + clubId + '/activity/' + id).then(res => {
                if (res.success) {
                    this.setState({
                        editVisible: true,
                        detail: res.data.activity
                    })
                }
            })
        })
    }

    editActivity2(id) {
        const {clubId} = this.state
        this.setState({
            detail2: {}
        }, () => {
            $get('/clubs/admin/' + clubId + '/activity/' + id).then(res => {
                if (res.success) {
                    this.setState({
                        editVisible2: true,
                        detail2: res.data.activity
                    })
                }
            })
        })
    }

    createActivity(id) {
        this.setState({
            detail: {},
            createVisible: true
        })
    }

    handleEditCancel = () => {
        const form = this.updateFormRef.props.form
        form.resetFields()
        this.setState({
            editVisible: false,
        })
    }

    handleEditCancel2 = () => {
        const form = this.updateFormRef.props.form
        form.resetFields()
        this.setState({
            editVisible2: false,
        })
    }

    handleCreateCancel = () => {
        const form = this.createFormRef.props.form
        form.resetFields()
        this.setState({
            createVisible: false
        })
    }

    saveUpdateFormRef = (formRef) => {
        this.updateFormRef = formRef
    }

    saveUpdateFormRef2 = (formRef) => {
        this.updateFormRef = formRef
    }

    saveCreateFormRef = (formRef) => {
        this.createFormRef = formRef
    }

    handleUpdate = () => {
        const {clubId} = this.state
        const form = this.updateFormRef.props.form
        form.validateFields((err, values) => {
            if (err) {
                return
            }
            const activityId = this.state.detail.id
            const {detail} = this.state

            let post_horizontal_image_token = values.post_horizontal_image && values.post_horizontal_image.length > 0 ?
                values.post_horizontal_image[0].response.data.token : null
            let post_vertical_image_token = values.post_vertical_image && values.post_vertical_image.length > 0 ?
                values.post_vertical_image[0].response.data.token : null

            $put('/clubs/admin/' + clubId + '/activity/' + activityId, {
                position: values.position,
                description: values.description,
                start_time: (!!values.start_time ? values.start_time.format('YYYY-MM-DD HH:mm:ss') : undefined) || detail.start_time,
                end_time: (!!values.end_time ? values.end_time.format('YYYY-MM-DD HH:mm:ss') : undefined) || detail.end_time,
                post_horizontal_image_token: post_horizontal_image_token,
                post_vertical_image_token: post_vertical_image_token,
                introduction_article_title: values.introduction_article_title,
                introduction_article_url: values.introduction_article_url,
                retrospect_article_title: values.retrospect_article_title,
                retrospect_article_url: values.retrospect_article_url,
                max_people_limit: values.max_people_limit,
                need_enroll: values.need_enroll,
                host_clubs: values.host_clubs
            }).then((res) => {
                if (!res.success) {
                    Modal.confirm({
                        title: '活动信息更新失败',
                        content: '请检查您的输入后重试',
                        okText: '我知道了',
                        cancelText: '好的'
                    })
                } else {
                    this.setState({editVisible: false}, () => {
                        form.resetFields()
                        this.refresh()
                    })
                }
            })
        })
    }

    handleUpdate2 = () => {
       /* const {clubId} = this.state
        const form = this.updateFormRef.props.form
        form.validateFields((err, values) => {
            if (err) {
                return
            }
            const activityId = this.state.detail.id
            const {detail} = this.state

            let post_horizontal_image_token = values.post_horizontal_image && values.post_horizontal_image.length > 0 ?
                values.post_horizontal_image[0].response.data.token : null
            let post_vertical_image_token = values.post_vertical_image && values.post_vertical_image.length > 0 ?
                values.post_vertical_image[0].response.data.token : null

            $put('/clubs/admin/' + clubId + '/activity/' + activityId, {
                position: values.position,
                description: values.description,
                start_time: (!!values.start_time ? values.start_time.format('YYYY-MM-DD HH:mm:ss') : undefined) || detail.start_time,
                end_time: (!!values.end_time ? values.end_time.format('YYYY-MM-DD HH:mm:ss') : undefined) || detail.end_time,
                post_horizontal_image_token: post_horizontal_image_token,
                post_vertical_image_token: post_vertical_image_token,
                introduction_article_title: values.introduction_article_title,
                introduction_article_url: values.introduction_article_url,
                retrospect_article_title: values.retrospect_article_title,
                retrospect_article_url: values.retrospect_article_url,
                max_people_limit: values.max_people_limit,
                need_enroll: values.need_enroll,
                host_clubs: values.host_clubs
            }).then((res) => {
                if (!res.success) {
                    Modal.confirm({
                        title: '活动信息更新失败',
                        content: '请检查您的输入后重试',
                        okText: '我知道了',
                        cancelText: '好的'
                    })
                } else {
                    this.setState({editVisible: false}, () => {
                        form.resetFields()
                        this.refresh()
                    })
                }
            })
        })*/
       //等待后端数据，不进行任何操作
        const form = this.updateFormRef.props.form
        form.resetFields()
        this.props.history.push('/admin/index')
    }

    handleCreate = () => {
        const {clubId} = this.state
        const form = this.createFormRef.props.form
        form.validateFields((err, values) => {
            if (err) {
                return
            }
            let post_horizontal_image_token = values.post_horizontal_image && values.post_horizontal_image.length > 0 ?
                values.post_horizontal_image[0].response.data.token : null
            let post_vertical_image_token = values.post_vertical_image && values.post_vertical_image.length > 0 ?
                values.post_vertical_image[0].response.data.token : null
            $post('/clubs/admin/' + clubId + '/activity', {
                name: values.name,
                position: values.position,
                description: values.description,
                start_time: values.start_time.format('YYYY-MM-DD HH:mm:ss'),
                end_time: !!values.end_time ? values.end_time.format('YYYY-MM-DD HH:mm:ss') : null,
                post_horizontal_image_token: post_horizontal_image_token,
                post_vertical_image_token: post_vertical_image_token,
                introduction_article_title: values.introduction_article_title,
                introduction_article_url: values.introduction_article_url,
                retrospect_article_title: values.retrospect_article_title,
                retrospect_article_url: values.retrospect_article_url,
                max_people_limit: values.max_people_limit,
                need_enroll: values.need_enroll,
                host_clubs: values.host_clubs
            }).then((res) => {
                if (!res.success) {
                    Modal.confirm({
                        title: '活动创建失败',
                        content: '请检查您的输入后重试',
                        okText: '我知道了',
                        cancelText: '好的'
                    })
                } else {
                    this.setState({createVisible: false}, () => {
                        form.resetFields()
                        this.refresh()
                    })
                }
            })
        })
    }

    goBack() {
        this.props.history.goBack()
    }

    render() {
        let {activities, detail} = this.state
        let activitiesView = null
        if (activities.length !== 0) {
            activitiesView = activities.map((activity, index) => {
                return <Card className={'activity-card'} key={index}
                             hoverable={true}
                             cover={<img onClick={this.showDetailInfo.bind(this, activity.id)}
                                         style={{height: 175, width: 350}} alt={'poster'}
                                         src={img(activity.post_url_horizontal)}/>}
                             actions={[
                                 <div onClick={this.editActivity.bind(this, activity.id)}><Icon style={{fontSize: 20}}
                                                                                                type="edit"/>
                                     <div style={{fontSize: 8}}>编辑</div>
                                 </div>,
                                 <div onClick={this.editActivity2.bind(this, activity.id)}><Icon style={{fontSize: 20}}
                                 type="edit"/>
                                 <div style={{fontSize: 8}}>评价</div>
                                 </div>

                             ]}
                             bodyStyle={{padding: 20, textAlign: 'center'}}>
                    <Card.Meta onClick={this.showDetailInfo.bind(this, activity.id)}
                               title={activity.name} description={activity.place}/>
                </Card>
            })
        } else {
            activitiesView = <Empty/>
        }
        return (
            <div className={'activity-container'}>
                <div className={'article-button-wrap'}>
                    <Button className={'activity-button'} onClick={this.goBack.bind(this)} shape={'circle'} icon={'left'}
                            size={'large'} type={'primary'}/>
                    <Button className={'activity-button'} onClick={this.createActivity.bind(this)} shape={'circle'} icon={'plus'}
                            size={'large'} type="primary"/>
                </div>
                <ActivityUpdateForm
                    wrappedComponentRef={this.saveUpdateFormRef}
                    visible={this.state.editVisible}
                    onCancel={this.handleEditCancel}
                    onCreate={this.handleUpdate}
                    activity={this.state.detail}
                />
                <ActivityUpdateForm2
                    wrappedComponentRef={this.saveUpdateFormRef2}
                    visible={this.state.editVisible2}
                    onCancel={this.handleEditCancel2}
                    onCreate={this.handleUpdate2}
                    activity={this.state.detail2}
                />
                <ActivityCreateForm
                    wrappedComponentRef={this.saveCreateFormRef}
                    visible={this.state.createVisible}
                    onCancel={this.handleCreateCancel}
                    onCreate={this.handleCreate}
                />
                <Drawer
                    width={640}
                    placement="right"
                    closable={false}
                    onClose={this.onDetailClose.bind(this)}
                    visible={this.state.detailVisible}
                >
                    <p style={{...pStyle, marginBottom: 24}}>活动信息</p>
                    <p style={pStyle}>基本信息</p>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="活动名称" content={detail.name}/>
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="活动地点" content={detail.position}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="开始时间" content={detail.start_time}/>
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="结束时间" content={detail.end_time}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="关注人数" content={detail.followers_number}/>
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="人数" content={detail.joiner_number}/>
                        </Col>
                    </Row>
                    <Divider/>
                    <p style={pStyle}>活动介绍</p>
                    <Row>
                        <Col span={24}>
                            {detail.description}
                        </Col>
                    </Row>
                    <Divider/>
                    <p style={pStyle}>其它信息</p>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="活动最大人数" content={detail.max_people_limit}/>
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="是否需要报名" content={detail.need_enroll ? '是' : '否'}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="活动介绍标题" content={detail.introduction_article_title}/>
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="活动介绍推送链接" content={detail.introduction_article_url}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="活动回顾标题" content={detail.retrospect_article_title}/>
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="活动介绍推送链接" content={detail.retrospect_article_url}/>
                        </Col>
                    </Row>
                </Drawer>
                {activitiesView}</div>
        )
    }
}
