import { db } from "@/lib/db";
import { categories, projects, promotions } from "@/lib/schema";
import { eq } from "drizzle-orm";

export default async function ProjectsSlideshow() {

    const categoriesData = await db.select({
        id: categories.id,
        name: categories.name
    }).from(categories);

    const projectsData = await db.select({
        id: projects.id,
        title: projects.title,
        promotionName: promotions.name,
        categoryName: categories.name,
        repositoryUrl: projects.repositoryUrl,
        demoUrl: projects.demoUrl,
        creationDate: projects.creationDate
    })
        .from(projects)
        .leftJoin(categories, eq(projects.categoryId, categories.id))
        .leftJoin(promotions, eq(projects.promotionId, promotions.id));

    return (
        <main>

            {categoriesData.map((category) => (
                <div key={category.id}>
                    <h1>{category.name}</h1>
                    <div>
                    </div>
                </div>
            ))}

            <br />

           {projectsData.map((project) => (
            <div key={project.id}>
                <h1>{project.title}</h1>
                <p>Catégorie : {project.categoryName}</p>
                <p>Créé par un·e élève de la promotion {project.promotionName}</p>

                <p>liens : <a href={project.repositoryUrl}>répertoire</a> <a href={project.demoUrl}>démo</a></p>
                <p>projet envoyé le {project.creationDate}</p>
                <br />
            </div>

        ))}

        </main>
    );
}