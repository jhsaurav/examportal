import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  categories = [];
  searchText = "";
  isCollapsed = false;

  constructor(private _cat: CategoryService) {}

  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        Swal.fire("Error", "Error in loading categories", "error");
      }
    );
  }

  // Toggle collapse
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  // Search filter
  filteredCategories() {
    return this.categories.filter((cat: any) =>
      cat.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  // SMART ICON SYSTEM
  getCategoryIcon(title: string): string {
    title = title.toLowerCase();

    const keywordIcons: any = {
      "program": "code",
      "coding": "code",
      "java": "coffee",
      "python": "memory",
      "web": "public",
      "computer": "computer",
      "machine": "smart_toy",
      "ai": "psychology",
      "ml": "smart_toy",

      "aptitude": "psychology",
      "reasoning": "psychology",
      "logic": "timeline",
      "puzzle": "extension",

      "current": "public",
      "affair": "public",
      "general": "public",
      "gk": "public",

      "english": "translate",
      "hindi": "translate",
      "grammar": "spellcheck",

      "biology": "biotech",
      "physics": "science",
      "chemistry": "science",
      "science": "science",

      "math": "calculate",
      "finance": "savings",
      "account": "attach_money",

      "history": "auto_stories",
      "geography": "map",
      "sports": "sports_soccer",
      "health": "health_and_safety",
    };

    for (const key in keywordIcons) {
      if (title.includes(key)) return keywordIcons[key];
    }

    return "category";
  }

}
