'use client'

import Header from "@/components/header";
// import Link from "next/link";
import styles from './styles.module.css';
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/button";
import { FormEvent } from "react";
import { registerAPI } from "@/service/api";

interface registerType {
    [email: string]: string;
    nickname: string;
    lastName: string;
    firstName: string;
    password: string;
    confirmPassword: string;
}

export default function Page() {

    async function register(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const formObject = {} as registerType;
        formData.forEach((value, key) => {
            if(typeof value === 'string'){
                formObject[key] = value;
            }
          });

        const response = await registerAPI(formObject);

        if(response.code === 200){
            alert(response.message);
            window.location.href = '/login'; // Redirect to home page after successful registration
        } else {
            alert(response.message);
        }
    }

    return (
        <div>
            <Header></Header>
            <header className={styles.home}>
                <div className="bg-zinc-400 p-6 opacity-85 rounded-xl">
                    <form onSubmit={register}>
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 flex-col items-center">
                            <h1 className="text-2xl">Register</h1>
                            <Input required className="w-80" name="email" type="email" label="Email" />
                            <Input required className="w-80" name="nickname" type="nickname" label="Nickname"/>
                            <Input required className="w-80" name="lastName" type="lastName" label="lastName"/>
                            <Input required className="w-80" name="firstName" type="firstName" label="firstName"/>
                            <Input required className="w-80" name="password" type="password" label="Password"/>
                            <Input required className="w-80" name="comfirmPassword" type="password" label="Confirm Password"/>
                            <Button type="submit" color="primary">Submit</Button>
                        </div>
                    </form>
                </div>
            </header>
        </div>
    )
};