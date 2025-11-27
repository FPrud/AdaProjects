"use client";

import { useState, useEffect } from "react";
import { getCategories } from "../api/categories";
import { getProjects } from "../api/projects";

interface projectItem {
    id: number;
    title: string;
    promotionName: string;
    categoryName: string;
    repositoryUrl: string;
    demoUrl: string;
    creationDate: string;
}

interface categoryItem {
    id: number;
    name: string;
}

export const ProjectsSlideshow = () => {

    const [projects, setProjects] = useState<projectItem[]>([]);
    const [categories, setCategories] = useState<categoryItem[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const projectsResult = await getProjects();
            if (projectsResult.success) {
                setProjects(projectsResult.data as projectItem[]);
            }

            const categoriesResult = await getCategories();
            if (categoriesResult.success) {
                setCategories(categoriesResult.data as categoryItem[]);
            }
        };
        loadData();
    }, []);

    return (

        <div id="projectsSlideshow" className="flex flex-col">
            {categories.map((category) => {
                // 1. Filtrer les projets pour la catégorie actuelle
                const filteredProjects = projects.filter(
                    (project) => project.categoryName === category.name
                );

                // 2. Condition de Masquage : Si aucun projet, on ne retourne rien (null)
                if (filteredProjects.length === 0) {
                    return null;
                }

                // 3. Afficher la catégorie et les projets filtrés si la liste n'est pas vide
                return (
                    <div key={category.id} className="flex flex-col">
                        <h1 id="categoryTitle">{category.name}</h1>

                        <div id="projectsContainer" className="flex-row no-wrap">
                            {filteredProjects.map((project) => (
                                <div key={project.id} id="project" className="flex flex-col w-[250px]">
                                    <h2>{project.title}</h2>
                                    <img src="http://img.png" width="200px" height="120px" />
                                    <p>Crée le {project.creationDate} par un·e élève de la promotion {project.promotionName} dans le cadre du projet {project.categoryName}</p>
                                    <p id="projectInfos" className="flex flex-col">
                                        <a href={project.repositoryUrl}>Consulter le répertoire</a>
                                        <a href={project.demoUrl}>Essayer la démo</a>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
            <br />
        </div>


        // <div id="projectsSlideshow" className="flex flex-col">
        //     {categories.map((category) => (
        //         <div key={category.id} className="flex flex-col">
        //             <h1 id="categoryTitle">{category.name}</h1>

        //             <div id="projectsContainer" className="flex flex-row no-wrap">
        //                 {projects
        //                     .filter(project => project.categoryName === category.name)
        //                     .map((project) => (
        //                         <div key={project.id} id="project" className="flex flex-col w-[250px]">
        //                             <h2>{project.title}</h2>
        //                             <img src="http://img.png" width="200px" height="120px" />
        //                             <p>Crée le {project.creationDate} par un·e élève de la promotion {project.promotionName} dans le cadre du projet {project.categoryName}</p>
        //                             <p id="projectInfos" className="flex flex-col">
        //                                 <a href={project.repositoryUrl}>Consulter le répertoire</a>
        //                                 <a href={project.demoUrl}>Essayer la démo</a>
        //                             </p>
        //                         </div>
        //                     ))}

        //             </div>
        //         </div>
        //     ))}
        //     <br />

        // </div>
    );
}