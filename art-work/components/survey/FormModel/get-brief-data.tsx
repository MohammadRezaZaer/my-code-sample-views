import React, {forwardRef} from 'react'
import {motion} from 'framer-motion'
import Input from '@components/ui/forms/input'
import {Form} from '@components/ui/forms/form'
import validationSchema from "@components/survey/FormModel/validationSchema";
import Button from "@components/ui/elements/button";



const nextVariants = {
    hidden: {
        x: '-100vw'
    },
    visible: {
        x: 0,
        transition: {type: 'spring', stiffness: 120}
    }
}

const buttonVariants = {
    hover: {
        textShadow: '0px 0px 8px rgb(255,255,255)',
        boxShadow: '0px 0px 8px rgb(255,255,255)',
        transition: {
            duration: 0.3,
            repeat: Infinity,
            repeatType: 'reverse'
        }
    }
}

// @ts-nocheck
const GetBriefData = ({
                          addText,
                          onSubmit,
                          values,
                          currentQuest,

                      }, ref) => {


    let form

    form = <>


        <h2 className=" py-6 text-3xl font-semibold">{currentQuest.type.title}</h2>

        <Form
            onSubmit={onSubmit}
            validationSchema={validationSchema[0]}
            useFormProps={{
                defaultValues: {
                    [currentQuest.type.textInputKey]: values[currentQuest.type.name][currentQuest.type.textInputKey],

                },
            }}
        >
            {({register, formState: {errors}}) => (
                <>


                    {

                        <>

                            <Input

                                {...register(currentQuest.type.textInputKey)}
                                variant='line'
                                placeholder={currentQuest.type.text_placeholder}
                                lableClass='!mb-12'

                                error={(errors[currentQuest.type.name]?.message!)}
                            />


                            {/*<h3> Or Choose your Needed Skills</h3>*/}
                        </>
                    }

                    {
                        (
                            <motion.div className='mt-[5%]'
                                        variants={nextVariants}
                            >


                                <Button variants={buttonVariants}
                                        whileHover='hover'
                                        variant='balckWhite'
                                    /*loading={isLoading} disabled={isLoading}*/>
                                    {('next')}
                                </Button>
                            </motion.div>
                        )}
                </>
            )}
        </Form>
    </>


    return (

        <div className='quest flex flex-col p-4 justify-center w-full md:pt-0'
             ref={ref}
        >
            {form}

        </div>


    )
}

export default forwardRef(GetBriefData)




