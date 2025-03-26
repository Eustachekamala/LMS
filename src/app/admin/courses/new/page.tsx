import PageHeader from "@/components/PageHeader";
import CourseForm from "@/features/courses/components/CourseForm";


export default function CoursesPage(){
    return(
        <div className="container">
           <PageHeader title="New Course"/>
           <CourseForm/>
        </div>
    )
}