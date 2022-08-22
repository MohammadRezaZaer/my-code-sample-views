import React, {forwardRef, useEffect, useRef, useState} from 'react'
import {motion} from 'framer-motion'
import Input from '@components/ui/forms/input'
import {Form} from '@components/ui/forms/form'
import cn from 'classnames'
import mainFormModel from "@components/ui/forms/model/mainFormModel";
import validationSchema from "@components/ui/forms/model/validationSchema";
import Button from "@components/ui/elements/button";

const containerVariants = {
    hidden: {
        opacity: 0,
        x: '100vw',
        transition: {
            staggerChildren: 0.3
        }
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            mass: 0.4,
            damping: 8,
            staggerChildren: 0.1,
            when: 'beforeChildren'
        }
    }
}

const childVariants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1
    }
}
const {formId, formField} = mainFormModel

const {
    formField: {
        Name,
        Email,
        Portfolio,
        Company,
        PhoneNumber,
        Lookings
    }
} = mainFormModel


const MainForm = ({addData, consult, quests, questId, onSubmit}, ref) => {
    // const [success,setSuccess ]=useState(false)
    // const animRef = useRef()


    return (
        <>

            {<>
                <div className='  flex flex-col  justify-center  text-center md:text-left  text-black2'
                     ref={ref}
                >
                    <motion.div className=''
                                variants={containerVariants}
                                initial='hidden'
                                animate='visible'
                                exit='exit'
                    >


                        <Form
                            onSubmit={onSubmit}
                            validationSchema={validationSchema[0]}
                            useFormProps={{
                                defaultValues: {
                                    [Name.name]: consult.name,
                                    [Email.name]: consult.email,
                                    [Portfolio.name]: consult.portfolio,
                                },
                            }}
                        >
                            {({register, formState: {errors}}) => (

                                <>
                                    <div
                                        className=' mx-auto  flex flex-col  gap-y-4 md:gap-y-6 text-lg xl:pr-[5%] '>
                                        {/*Name row*/}
                                        <h2 className="hidden xl:flex text-2xl 2xl:text-4xl font-semibold leading-relaxed 2xl:leading-[52px]	 text-black2 xl:-mr-16">Access
                                            the
                                            worlds largest art gallery <br/>from
                                            anywhere. Built by artists, for artists</h2>
                                        <motion.div variants={childVariants} className=''>
                                            <Input
                                                {...register(Name.name)}
                                                variant='outline'
                                                errorClass={'mt-0'}
                                                placeholder={Name.placeholder}
                                                inputClassName=""
                                                label={Name.label}
                                                error={(errors[Name.name]?.message!)}
                                            />
                                        </motion.div>
                                        {/*Name row End*/}
                                        {/*Email row*/}
                                        <motion.div variants={childVariants} className=''>
                                            <Input
                                                {...register(Email.name)}
                                                variant='outline'
                                                errorClass={'mt-0'}
                                                placeholder={Email.placeholder}
                                                label={Email.label}

                                                inputClassName=""
                                                error={(errors[Email.name]?.message!)}
                                            />
                                        </motion.div>
                                        {/*Email row End*/}

                                        {/*Name row*/}

                                        <motion.div variants={childVariants} className=''>
                                            <Input
                                                {...register(Portfolio.name)}
                                                variant='outline'
                                                errorClass={'mt-0'}
                                                placeholder={Portfolio.placeholder}
                                                inputClassName=" "
                                                label={Portfolio.label}
                                                error={(errors[Portfolio.name]?.message!)}
                                            />
                                            <p className="text-grey2 text-xs md:text-base my-1">{Portfolio.title} </p>
                                        </motion.div>
                                        {/*Name row End*/}

                                        <motion.div variants={childVariants}
                                                    className="">
                                            <div/>
                                            <Button
                                                variant={'backShinyDark'}
                                                className=""
                                                /*loading={isLoading} disabled={isLoading}*/>
                                                Apply
                                            </Button>
                                            <div/>
                                        </motion.div>

                                    </div>


                                </>
                            )}
                        </Form>

                    </motion.div>

                </div>
            </>}
        </>
    )


}

export default forwardRef(MainForm)