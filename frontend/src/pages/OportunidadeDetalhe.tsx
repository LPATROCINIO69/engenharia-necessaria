import React from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { TextViewCustom } from "../components/TextViewCustom";
import { HeaderPage } from "../components/HeaderPage";
import { useLocation } from "react-router-dom";

import '../styles/OportunidadeDetalhe.css';
import { useNavigate } from "react-router-dom";

//const textoLongo = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum modi adipisci sint cupiditate esse error, suscipit et eum autem minus tempora voluptates ad officiis facilis, dolor blanditiis reiciendis quae. Possimus ducimus at aliquid! Quos aut inventore itaque ipsum animi, maiores sapiente et error amet atque laboriosam laborum explicabo aliquid facilis ratione officiis deserunt sequi. Consequuntur sed voluptatibus doloremque ad repellendus, quibusdam neque adipisci odio vel corporis ut repellat quam minima pariatur in minus quisquam eaque soluta reiciendis rem obcaecati eveniet maiores deserunt laudantium. Praesentium autem, quae cupiditate et impedit laboriosam atque optio ab nobis tempore! Deleniti doloribus fugiat quo quia maiores animi vero exercitationem, natus beatae voluptate? Iusto, nam? Unde quam repudiandae voluptatem hic labore ex dolorum minus! Cum in quam eaque, veritatis tenetur voluptatum vel eum qui quia? Sint similique corporis modi iure vero dolores dicta, harum delectus doloribus ipsam dolorem. Libero illo dolores autem rem adipisci. Voluptates officia molestiae odio, ducimus in hic minima laborum amet inventore doloremque facilis! Laboriosam dignissimos recusandae quibusdam, excepturi fugiat necessitatibus ducimus labore, laborum animi consectetur cumque quam amet quas sed id saepe minima suscipit! Saepe, repudiandae. In facere nulla, ab harum exercitationem, praesentium voluptates assumenda saepe sequi quaerat nobis. Aliquid, sint. Ut doloremque harum nemo, nihil architecto quis dignissimos quo exercitationem at distinctio minus corporis aliquam. Dolore provident non delectus dolorem iusto fuga, tempora aut illum vitae eos? Recusandae nesciunt ad placeat consequuntur corporis tenetur rerum distinctio odio nihil ut hic reprehenderit laborum, excepturi delectus eius inventore, dicta ducimus amet. Aut voluptatibus tenetur accusantium odio, modi officia ipsa deleniti rerum beatae, eum vitae, repellendus excepturi magni. Placeat temporibus sit officiis optio sapiente doloribus illum possimus maxime architecto cum quibusdam rem in, accusantium inventore itaque ea assumenda. Obcaecati id minima amet provident quasi iste praesentium, quia nesciunt commodi magnam soluta, illum voluptate ex natus hic eligendi facere sit atque animi temporibus nulla laboriosam ducimus vel omnis. Ab ducimus cumque amet fuga optio, numquam, doloribus perferendis atque sequi voluptatibus, harum ex. Pariatur dolorem laudantium, iure repudiandae iusto mollitia eveniet odit! Excepturi magnam quo molestiae eveniet quidem numquam sequi recusandae. Explicabo, voluptatem ex in magnam mollitia inventore minus eveniet dignissimos corporis cupiditate, hic optio veritatis animi doloremque quia tempora possimus nobis. Aspernatur sunt facere pariatur rerum, hic nisi cupiditate harum doloribus? Placeat reprehenderit similique totam aliquam ad nobis pariatur, odit, magni et rem facilis rerum repellat ab unde nulla? Odit nulla eum, veniam iste voluptatem quo voluptatum, ad ipsa enim cupiditate ut amet beatae, nostrum repudiandae ipsam deserunt alias magni suscipit laborum laudantium. Architecto quidem aperiam tenetur totam accusamus obcaecati mollitia soluta natus rerum voluptas? Aspernatur non corrupti, recusandae accusamus aut labore assumenda dicta culpa possimus ab soluta autem quae eveniet quia asperiores laborum consequuntur esse reprehenderit voluptatum tenetur quos. Iure quis itaque amet cupiditate libero ea hic, nam totam natus nostrum cum provident facere illum dignissimos aperiam aliquid dicta odio ratione tempore voluptates nesciunt sed quos dolorum ullam? Quo dolore consequatur incidunt delectus obcaecati nulla omnis qui dolores doloremque, exercitationem blanditiis ipsa, repellendus quae.";


export function OportunidadeDetalhe(){
    const navigate = useNavigate();
    const location = useLocation();

    const { vaga } = location.state || {};
    if (!vaga) return <p>Nenhuma vaga selecionada.</p>;

    const hipertexto:string = vaga.link;

    const description:string =  `<h4>${vaga.title}</h3>
                                <hr>
                                <p><em> ${vaga.typeEngineering} - ${(vaga.typeJob==="job")?"Efetivo":"Estagiário"} - ${vaga.jobLocation}</em></p>
                                <hr>
                                <p>${vaga.description}</p>
                                <hr>
                                <div>
                                    <p><strong>Requisitos</strong></p>
                                    <p>${vaga.requirements}</p>
                                </div>
                                <hr>
                                <div>
                                    <p><strong>Benefícios</strong></p>
                                    <p>${vaga.benefits}</p>
                                </div>
                                <hr>
                                <div>
                                    <p><strong>Responsabilidades</strong></p>
                                    <p>${vaga.responsabilities}</p>
                                </div>`
 
    const handleSubmit = (e:React.FormEvent) =>{
        e.preventDefault();        
        navigate('/divulgar');
    };

    return(
        <div className="detalhe-container">
            
            <HeaderPage />

            <form onSubmit={handleSubmit} className="detalhe-form">
                <h2>Oportunidade</h2>
                <Input 
                    label="Link"
                    type ="url"
                    readOnly
                    value={hipertexto}
                    style={{ cursor: "pointer" }}
                    title="Clique para abrir o link"
                    onClick={() => window.open(hipertexto, "_blank")}
                />

                <TextViewCustom 
                    text={description}
                    label="Descrição Detalhada"
                    className="textview-container"
                    height={300}
                    allowHTML={true}
                />
                
                <Button type ="submit">Divulgar Oportunidade</Button>


            </form>
            

        </div>


    );


}