import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoriesComponent } from './pages/admin/add-categories/add-categories.component';
import { ViewQuizComponent } from './pages/admin/view-quiz/view-quiz.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuestionsComponent } from './pages/admin/view-questions/view-questions.component';
import { AddQuestionsComponent } from './pages/admin/add-questions/add-questions.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { StartComponent } from './pages/user/start/start.component';
import { UpdateCategoryComponent } from './pages/admin/update-category/update-category.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, pathMatch: 'full',
  },

  {
    path: 'signup', component: SignupComponent, pathMatch: 'full',
  },

  {
    path: 'login', component: LoginComponent, pathMatch: 'full',
  },

  {
    path: 'admin',
    component: DashboardComponent,
    //canActivate: [AdminGuard],   //when we comment it then we can access admin dasboard but wecant access if its uncommented
    children: [
      {
        path: '', component: WelcomeComponent,
      },
      {
        path: 'profile', component: ProfileComponent,
      },
      {
        path: 'categories', component: ViewCategoriesComponent,
      },
      {
        path: 'add-category', component: AddCategoriesComponent,
      },
      {
        path: 'quiz', component: ViewQuizComponent,
      },
      {
        path: 'add-quiz', component: AddQuizComponent,
      },
      {
        path: 'quiz/:qid', component: UpdateQuizComponent,
      },
      {
        path: 'view-questions/:qid/:title', component: ViewQuestionsComponent,
      },
      {
        path: 'add-questions/:qid/:title', component: AddQuestionsComponent,
      },
      {  
        path: 'update-category/:cid', component: UpdateCategoryComponent 
      },

    ],
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    // pathMatch: 'full',
    canActivate: [NormalGuard],
    children: [
      {
        path: ':catId',
        component: LoadQuizComponent,
      },
      {
        path: 'instructions/:qid',
        component: InstructionsComponent,
      },

    ],
  },
  {
    path: 'start/:qid', component: StartComponent, canActivate: [NormalGuard],
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
