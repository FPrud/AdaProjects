"use client";

import { useState, useEffect } from "react";
import { getCategories } from "../api/categories";
import { getProjects } from "../api/projects";
import { getPromotions } from "../api/promotions";
import { ProjectCard } from "./ProjectCard";
import { projectItem, categoryItem, promotionItem } from "../types";

export const ProjectsSlideshow = () => {

    const [selectedPromotionId, setSelectedPromotionId] = useState<string>("/");

    const [projects, setProjects] = useState<projectItem[]>([]);
    const [categories, setCategories] = useState<categoryItem[]>([]);
    const [promotions, setPromotions] = useState<promotionItem[]>([]);

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

            const promotionsResult = await getPromotions();
            if (promotionsResult.success) {
                setPromotions(promotionsResult.data as promotionItem[]);
            }

        };
        loadData();
    }, []);

    const handlePromotionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPromotionId(event.target.value);
    };

    const filteredProjectsByPromotion = projects.filter((project) => {
        if (selectedPromotionId === "/") {
            return true;
        }

        // Convertir l'ID sélectionné (string) en nombre
        const selectedIdNumber = Number(selectedPromotionId);

        // Vérifier l'existence de promotionId (maintenant il devrait exister !)
        if (isNaN(selectedIdNumber) || project.promotionId == null) {
            return false;
        }

        return project.promotionId === selectedIdNumber;
    });

    const slicedTitle = (str: string, max: number) => {
        if (str.length <= max) {
            return str;
        }
        return str.slice(0, max) + '...';
    };



    return (
        <>
            <div id="menuButtons">
                <select
                    className="border-black border-2"
                    value={selectedPromotionId}
                    onChange={handlePromotionChange}
                >
                    <option value="/">Toutes les promotions</option>
                    {promotions.map((promotion) => (
                        <option key={promotion.id} value={promotion.id}>{promotion.name}</option>
                    ))}
                </select>
                <button className="border-black border-2">Soumettre un projet </button>
            </div>

            <div id="projectsSlideshow" className="flex flex-col">
                {categories.map((category) => {
                    const filteredProjects = filteredProjectsByPromotion.filter(
                        (project) => project.categoryName === category.name
                    );
                    if (filteredProjects.length === 0) {
                        return null;
                    }
                    return (
                        <div key={category.id} className="flex flex-col p-5">
                            <h2 id="categoryTitle">{category.name}</h2>
                            <div id="projectsContainer" className="flex flex-row flex-wrap gap-5 mt-2">
                                {filteredProjects.map((project) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        slicedTitle={slicedTitle}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
                <br />
            </div>
        </>
    );
}