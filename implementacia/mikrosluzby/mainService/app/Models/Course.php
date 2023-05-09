<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    /**
     * Override fillable property data.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'description',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_courses')->using(UserCourses::class)->withTimestamps();
    }

    public function tasks()
    {
        return $this->belongsToMany(Task::class, 'course_tasks')->using(CourseTasks::class)->withTimestamps();
    }
}
