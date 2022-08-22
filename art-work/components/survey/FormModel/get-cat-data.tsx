import React, {forwardRef} from 'react'
import {motion} from 'framer-motion'
import Input from '@components/ui/forms/input'
import {Form} from '@components/ui/forms/form'
import cn from 'classnames'
import consultFormModel from "@components/survey/FormModel/consultFormModel";
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


const GetCatData = ({
                        addItem,
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

                        <motion.div
                            // whileHover={{ scale: 1.2, originX: 0 }}
                            // transition={{ type: 'spring', stiffness: 300 }}
                            className='grid grid-cols-1 gap-6 w-full  '>
                            {
                                values[currentQuest.type.name]["selections"].includes("Other") &&
                                <>

                                    <Input

                                        {...register(currentQuest.type.textInputKey)}
                                        variant='line'
                                        placeholder={currentQuest.type.placeholder}
                                        lableClass='!mb-12'

                                        error={(errors[currentQuest.type.name]?.message!)}
                                    />


                                    {/*<h3> Or Choose your Needed Skills</h3>*/}
                                </>
                            }
                            <ul className=' grid grid-cols-3 gap-2 lg:gap-4 flex-wrap relative'>
                                {currentQuest.type.items.map(item => {
                                    let spanClass = values[currentQuest.type.name]["selections"].includes(item) ? 'bg-black2/30 !text-black2 border-black2' : ''

                                    return (
                                        <motion.li key={item} onClick={(e) => {

                                            addItem(item, currentQuest.type.name, "selections", "multiple")
                                        }}

                                                   className={cn('relative cursor-pointer' +
                                                       ' overflow-hidden text-lg relative p-2 px-8 border border-grey1 rounded-full' +
                                                       ' transition-colors duration-300 text-grey1', spanClass)}
                                        >{item}

                                        </motion.li>
                                    )
                                })}
                            </ul>
                        </motion.div>

                        {values[currentQuest.type.name]["selections"].length<=1 &&
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

export default forwardRef(GetCatData)




